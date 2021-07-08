// SPDX-License-Identifier: MIT
pragma solidity ^0.5.13;

/// control speed limit and gps point of speeding
/// distance for bonus

contract DriveSlowSafe {
    /// WHO
    struct Holder {
        bool isActive;
        uint256 rating;
        uint256 multiplier;
        uint256 penaltyMultiplier;
        uint accumulatedKM;
        bytes32[] penalties;
        bytes32[] policies;
    }

    /// WHAT
    struct Car {
        bool registered;
        string brand;
        string model;
        string year;
        // string vin;
    }

    /// WITH
    struct Device {
        //Intrinsic properties
        string imei;
        bool hasOrder;
        // uint32 freq;
        Status status;
        bytes32 policy;
    }

    /// ON WHAT CONDITIONS
    struct Policy {
        bool isActive;
        address policyHolder;
        bytes32 car;
        address device;
        // string startDate;
        // string endDate;
        uint256 premium;
        uint256 locked;
    }

    /// Will be used to store meaningful data data points
    struct DataPoint {
        string[3] accelerometer;
        string latitude;
        string longitude;
        string random;
        string timestamp;
    }

    struct Partner {
        bool registered;
        string name;
    }

    enum Status {
        waitingApproval,
        whitelisted,
        blocked
    }

    /// STORAGE MAPPINGS
    address payable public administrator;
    address[] public holdersIDs;
    bytes32[] public deviceIDs;
    mapping (address => Holder) private holders;
    mapping (bytes32 => Car) public cars;
    mapping (address => Device) public devices;
    mapping (bytes32 => Policy) public policies;
    mapping (bytes32 => DataPoint) public dataPoints;
    mapping (address => Partner) public partners;

    uint32 public alpha = 10;  // to calculate multipliers of users
    uint32 public speed = 50;  // maximal allowed speed
    uint256 public balance;

    constructor() public payable {
        require(msg.value > 0, "The contract need to be funded");
        administrator = msg.sender;
        balance = msg.value;
    }

    modifier onlyAdministrator() {
        require(msg.sender == administrator, "Only administrator can call this function");
        _;
    }

    /// Admin functions
    function approveDevice(address _walletAddress, string memory _imei) public onlyAdministrator {
        require(devices[_walletAddress].status == Status.waitingApproval, "This device has already been registered");

        devices[_walletAddress].imei = _imei;

        if (msg.sender == administrator) {
            devices[_walletAddress].status = Status.whitelisted;
        } else {
            devices[_walletAddress].status = Status.waitingApproval;
        }
    }

    function registerPartner(address _partner, string memory name) public onlyAdministrator {
        require(!partners[_partner].registered, "This partner has already been registered");

        partners[_partner] = Partner(true, name);
    }

    function kill() public onlyAdministrator {
        selfdestruct(administrator);
    }

    /// Policy holder functions
    function signPolicy(string memory _brand, string memory _model, string memory _year, address _device) public payable {
        require(msg.value > 0, "The premium cannot be 0");
        require(!devices[_device].hasOrder, "This device already has an order");
        require(devices[_device].status == Status.whitelisted, "This device is not approved yet");

        // activate policy holder account
        if (!holders[msg.sender].isActive) {
            activateAccount(msg.sender);
        }

        bytes32 _car = registerCar(_brand, _model, _year);
        bytes32 hash = keccak256(abi.encodePacked(msg.sender, _car, _device, msg.value));

        // Record policy
        uint256 toLock = holders[msg.sender].multiplier * msg.value;
        require(toLock <= balance, "The contract balance is insuficient to guarantee this policy");
        policies[hash] = Policy(true, msg.sender, _car, _device, msg.value, toLock);

        // add premium and supstract locked funds to the contract balance
        balance -= toLock;
        balance += msg.value;

        // Record change in device
        devices[_device].policy = hash;
        devices[_device].hasOrder = true;

        holders[msg.sender].policies.push(hash);
    }

    function payRepair(address payable _partner, bytes32 _policy) public payable {
        require(msg.value > 0, "The repair fee should be more than 0");
        require(partners[_partner].registered, "The given partner address doesn't exist among registered partners");
        require(policies[_policy].policyHolder == msg.sender, "Only owner of the policy can claim the funds");

        uint256 claimable = holders[msg.sender].penaltyMultiplier * policies[_policy].locked;
        uint256 cleanGrant = holders[msg.sender].multiplier * msg.value;  // the grant without applied penalties
        uint256 grant = cleanGrant * holders[msg.sender].penaltyMultiplier;
        require(grant <= claimable, "The claimable amount exeeds the limit");

        // the funds that the contract should transfer to the partner
        uint256 toPay = msg.value + grant;
        policies[_policy].locked -= cleanGrant;

        _partner.transfer(toPay);
    }

    /// backend functions
    function receiveMessage(
        string memory _accel1, string memory _accel2, string memory _accel3, string memory _latitude, string memory _longitude,
        string memory _random, string memory _timestamp, bytes32 _r, bytes32 _s
    ) public {
        string memory _message = string(abi.encodePacked(
                "{\"message\":{\"accelerometer\":[", _accel1 ,",", _accel2 ,",", _accel3, "],\"latitude\":",
                _latitude, ",\"longitude\":", _longitude, ",\"timestamp\":\"", _timestamp, "\",\"random\":\"", _random, "\"}}"
            ));

        bytes32 hash = keccak256(bytes(_message));
        address _deviceId = verifyMessage(hash, _r, _s);

        require(!(_deviceId == address(0)), "This message didn't pass the verification");
        require(devices[_deviceId].hasOrder, "This device has no order yet");

        dataPoints[hash] = DataPoint([_accel1, _accel2, _accel3], _latitude, _longitude, _random, _timestamp);
        bytes32 policy = devices[_deviceId].policy;
        address holder = policies[policy].policyHolder;
        applyPenalty(holder, hash);
    }

    function cancelPolicy(bytes32 _policy) public {
        // Todo: set policy deactivation
        // require time.now > policy.endDate
        uint256 unlocking = policies[_policy].locked;
        policies[_policy].locked = 0;
        policies[_policy].isActive = false;
        address device = policies[_policy].device;
        devices[device].hasOrder = false;
        devices[device].policy = bytes32(0);
        balance += unlocking;

    }

    /// utility functions
    function activateAccount(address _holderAddress) internal {
        require(!holders[_holderAddress].isActive, "The account has already been activated");
        holders[_holderAddress].isActive = true;
        holders[_holderAddress].rating = 1;
        holders[_holderAddress].penaltyMultiplier = 1;
        updateMultiplier(_holderAddress);
    }

    function updateMultiplier(address _holderAddress) internal {
        holders[_holderAddress].multiplier = alpha * holders[_holderAddress].rating;
    }

    function updateRating(address _holderAddress, bool _positive) internal {
        uint256 prevState = holders[_holderAddress].rating;

        if (_positive) {
            holders[_holderAddress].rating = holders[_holderAddress].rating + 1;
        } else {
            if (holders[_holderAddress].rating > 1) {
                holders[_holderAddress].rating = holders[_holderAddress].rating - 1;
            }
        }

        if (prevState != holders[_holderAddress].rating) {
            updateMultiplier;
        }
    }

    function registerCar(string memory _brand, string memory _model, string memory _year) internal returns(bytes32 car_hash) {
        car_hash = keccak256(abi.encodePacked(_brand, _model, _year));
        require(!cars[car_hash].registered, "This car has already been registered");

        cars[car_hash] = Car(true, _brand, _model, _year);
        return car_hash;
    }

    function verifyMessage(bytes32 _hash, bytes32 _r, bytes32 _s) internal view returns(address _deviceId) {
        for (uint8 v = 27; v < 29; v++) {
            _deviceId = ecrecover(_hash, v, _r, _s);

            if (devices[_deviceId].status == Status.whitelisted) {
                return(_deviceId);
            }
        }
        return address(0);
    }

    function applyPenalty(address _holder, bytes32 _dataPoint) internal {
        holders[_holder].penalties.push(_dataPoint);
        updateRating(_holder, false);
    }

    function showMyPenalties() public view returns(bytes32[] memory){
        return holders[msg.sender].penalties;
    }

    function showMyPolicies() public view returns(bytes32[] memory) {
        return holders[msg.sender].policies;
    }

    function getHolder(address _holderId) public view returns(bool, uint256, uint256, uint256, uint, bytes32[] memory, bytes32[] memory) {
        return (
        holders[_holderId].isActive,
        holders[_holderId].rating,
        holders[_holderId].multiplier,
        holders[_holderId].penaltyMultiplier,
        holders[_holderId].accumulatedKM,
        holders[_holderId].penalties,
        holders[_holderId].policies
        );
    }
}