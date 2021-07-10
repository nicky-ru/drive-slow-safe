// SPDX-License-Identifier: MIT
pragma solidity ^0.5.13;

/// control speed limit and gps point of speeding
/// distance for bonus
// Todo: add safemath
// Todo: review uint sizes and downgrade where possible
// Todo: add pagination on getters

contract DriveSlowSafe {
    /// WHO
    struct Holder {
        bool isActive;
        uint256 rating;
        uint256 multiplier;
        uint256 penaltyMultiplier;
        //        uint accumulatedKM;
        bytes32[] penalties;
        bytes32[] policies;
    }

    /// WHAT
    struct Vehicle {
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
        bytes32 vehicle;
        address device;
        // string startDate;
        // string endDate;
        uint256 premium;
        uint256 locked;
        uint256 fundsUsed;
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
    address[] private holdersIDs;
    bytes32[] private vehiclesIds;
    address[] private deviceIDs;
    bytes32[] private policyIDs;
    address[] private partnersIDs;
    mapping (address => Holder) public holders;
    mapping (bytes32 => Vehicle) public vehicles;
    mapping (address => Device) public devices;
    mapping (bytes32 => Policy) public policies;
    mapping (bytes32 => DataPoint) public dataPoints;
    mapping (address => Partner) public partners;

    uint32 private alpha = 2;  // to calculate multipliers of users
    uint32 private theta = 1000; // to calculate penalty multiplier
    uint32 private speed = 50;  // maximal allowed speed
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
        deviceIDs.push(_walletAddress);  // POSSIBLE BUG may create two id in the array
    }

    function registerPartner(address _partner, string memory name) public onlyAdministrator {
        require(!partners[_partner].registered, "This partner has already been registered");

        partners[_partner] = Partner(true, name);
        partnersIDs.push(_partner);
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

        bytes32 _vehicleId = registerVehicle(_brand, _model, _year);
        bytes32 hash = keccak256(abi.encodePacked(msg.sender, _vehicleId, _device, msg.value));

        // Record policy
        uint256 toLock = holders[msg.sender].multiplier * msg.value;
        require(toLock <= balance, "The contract balance is insuficient to guarantee this policy");
        policies[hash] = Policy(true, msg.sender, _vehicleId, _device, msg.value, toLock, 0);
        policyIDs.push(hash);

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

        uint256 claimable = holders[msg.sender].penaltyMultiplier * policies[_policy].locked / theta;
        uint256 cleanGrant = holders[msg.sender].multiplier * msg.value;  // the grant without applied penalties
        uint256 grant = cleanGrant * holders[msg.sender].penaltyMultiplier / theta;
        require(grant <= claimable, "The claimable amount exeeds the limit");

        // the funds that the contract should transfer to the partner
        uint256 toPay = msg.value + grant;
        policies[_policy].locked -= cleanGrant;
        policies[_policy].fundsUsed += grant;

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
        require(keccak256(abi.encodePacked(dataPoints[hash].random)) == keccak256(abi.encodePacked('')), "Such datapoint already exists");

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

        // handle policy deactivation and funds unlock to smartContract
        uint256 unlocking = policies[_policy].locked;
        policies[_policy].locked = 0;
        policies[_policy].isActive = false;

        // unlink device
        address device = policies[_policy].device;
        devices[device].hasOrder = false;
        devices[device].policy = bytes32(0);

        // upgrade user rating for successful policy usage
        updateRating(policies[_policy].policyHolder, true);

        balance += unlocking;
    }

    /// utility functions
    function activateAccount(address _holderAddress) internal {
        require(!holders[_holderAddress].isActive, "The account has already been activated");
        holders[_holderAddress].isActive = true;
        holders[_holderAddress].rating = 1;
        holders[_holderAddress].penaltyMultiplier = theta;
        holdersIDs.push(_holderAddress);
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

    function registerVehicle(string memory _brand, string memory _model, string memory _year) internal returns(bytes32 car_hash) {
        car_hash = keccak256(abi.encodePacked(_brand, _model, _year));
        require(!vehicles[car_hash].registered, "This car has already been registered");

        vehicles[car_hash] = Vehicle(true, _brand, _model, _year);
        vehiclesIds.push(car_hash);
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
        //        updateRating(_holder, false);
        uint256 _penaltyMultiplier = holders[_holder].penaltyMultiplier;
        _penaltyMultiplier -= 1;
        if (_penaltyMultiplier > 0) {
            holders[_holder].penaltyMultiplier = _penaltyMultiplier;
        }
    }

    function showMyPenalties() public view returns(bytes32[] memory){
        return holders[msg.sender].penalties;
    }

    function showMyPolicies() public view returns(bytes32[] memory) {
        return holders[msg.sender].policies;
    }

    function getHoldersIds() public view onlyAdministrator returns(address[] memory) {
        return holdersIDs;
    }

    function getVehicleIds() public view onlyAdministrator returns(bytes32[] memory) {
        return vehiclesIds;
    }

    function getDeviceIds() public view onlyAdministrator returns(address[] memory) {
        return deviceIDs;
    }

    function getPolicyIds() public view onlyAdministrator returns(bytes32[] memory) {
        return policyIDs;
    }

    function getPartnerIds() public view returns(address[] memory) {
        return partnersIDs;
    }
}