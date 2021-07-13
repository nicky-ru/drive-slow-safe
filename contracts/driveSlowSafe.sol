// SPDX-License-Identifier: MIT
pragma solidity ^0.5.13;
// Todo: add safemath
// Todo: review uint sizes and downgrade where possible
// Todo: add pagination on getters
// Todo: add events
// Todo: add fallback function

/** @title Drive Slow Safe. */
contract DriveSlowSafe {

    // Upon signing a transaction a user automatically becomes a policy holder
    struct Holder {
        bool isActive;  // Todo: change to "has active policies"
        uint256 rating;
        uint256 multiplier;
        uint256 penaltyMultiplier;
        bytes32[] penalties;
        bytes32[] policies;
        // Todo: add accumulatedKM property to add additional bonuses
        // Todo: add claims
    }

    // A vehicle is an object of insurance
    struct Vehicle {
        // Todo: add owner
        bool registered;  // Todo: remove this property later
        string brand;
        string model;
        string year;
    }

    // An IoTeX Pebble Tracker
    struct Device {
        // Todo: add block data
        // Todo: add name of the device
        string imei;
        bool hasOrder;  // Todo: remove property later (if the device has no policies assigned equals it has no order)
        Status status;  // Waiting approval or Whitelisted or Blocked
        bytes32 policy;  // Currently assigned active policy
    }

    struct Policy {
        // Todo: add start and end date
        bool isActive;  // false if not signed yet or already expired
        address policyHolder;  // A user who signed the Policy
        bytes32 vehicle;  // An object of insurance
        address device;  // A Pebble Tracker
        uint256 premium;  // An amount to be paid for a contract of insurance
        uint256 locked;  // Locked funds by the smart contract as a guarantee
        uint256 fundsUsed;  // Whenever a holder claims funds successfully the value is being add up
    }

    // Will be used to store data points with penalties
    struct DataPoint {
        // At the moment we use distance (between two gps points) to calculate Velocity
        // But we could consider to use accelerometer and gyroscope to calculate more precise data
        string[3] accelerometer;
        string latitude;
        string longitude;
        string random;
        string timestamp;
    }

    // A real and trusted car repair shop that will be responsible
    // for repairments of the crashed car
    // Partner is the only role to get claimable funds
    // CONSIDERATION: if a user is happens to be partner in physical world or has some sort of connections
    // with the partner, he could recursively claim funds in his favour. Need to find a way to solve the problem.
    struct Partner {
        // Todo: add more information, e.g. location (country, city, address), contacts, works done, reviews
        bool registered;
        string name;
    }

    // Registration status for Pebble devices.
    // The smart contract will receive messages only from whitelisted devices
    enum Status {
        // Todo: separate waiting approval and unknown
        waitingApproval,  // waiting approval, unknown
        whitelisted,  // Whitelisted by administrator
        blocked  // Blocked by administrator
    }

    address payable public administrator;  // creator of the contract
    uint256 public balance;  // unlocked balance of the smart contract
    /// STORAGE MAPPINGS
    address[] private holdersIDs;  // all users addresses who once signed policies
    bytes32[] private vehiclesIds;  // all registered vehicles
    address[] private deviceIDs;  // all registered Pebble devices
    bytes32[] private policyIDs;  // all signed policies
    address[] private partnersIDs;  // all registered partners
    mapping (address => Holder) public holders;
    mapping (bytes32 => Vehicle) public vehicles;  // Todo: make VIN property to be the key in mappings
    mapping (address => Device) public devices;
    mapping (bytes32 => Policy) public policies;
    mapping (bytes32 => DataPoint) public dataPoints;
    mapping (address => Partner) public partners;

    /************************************************/
    /*           Step 1.3: set multipliers          */
    /************************************************/
    // Todo: add according setters
    uint32 private alpha = 2;  // to calculate multipliers of users
    uint32 private theta = 1000; // to calculate penalty multiplier
    uint32 private initialRating = 1;  // initial rating of new users
    uint32 private speed = 50;  // maximal allowed speed

    constructor() public payable {
        // Todo: make separate function for funding the contract
        require(msg.value > 0, "The contract need to be funded");
        administrator = msg.sender;
        balance = msg.value;
    }

    modifier onlyAdministrator() {
        require(msg.sender == administrator, "Only administrator can call this function");
        _;
    }

    /************************************************/
    /*              ADMIN FUNCTIONS                 */
    /************************************************/

    /** @dev lets the administrator to register a device
    * @param _walletAddress Eth address of a device derived from a device's public key
    * @param _imei IMEI of a device
    * Todo: separate register device (anybody can register a device) and approve device (only administrator)
    */
    function approveDevice(address _walletAddress, string memory _imei) public onlyAdministrator {
        require(devices[_walletAddress].status == Status.waitingApproval, "This device has already been approved");

        devices[_walletAddress].imei = _imei;

        if (msg.sender == administrator) {
            devices[_walletAddress].status = Status.whitelisted;
        } else {
            devices[_walletAddress].status = Status.waitingApproval;
        }
        deviceIDs.push(_walletAddress);  // POSSIBLE BUG may create duplicated entry
    }

    // Todo: add block device function
    // Todo: add unblock device function
    // Todo: add delete device function

    /** @dev lets the administrator to register a partner
    * @param _partner Eth address of a partner to transfer funds
    * @param _name Real world organisation name of the partner
    */
    function registerPartner(address _partner, string memory _name) public onlyAdministrator {
        require(!partners[_partner].registered, "This partner has already been registered");

        partners[_partner] = Partner(true, _name);
        partnersIDs.push(_partner);
    }

    // Todo: add block/delete partner function

    // The function bring potential risk of a rug pull.
    // Todo: add condition, require(there is no active policies)
    function kill() public onlyAdministrator {
        selfdestruct(administrator);
    }

    /************************************************/
    /*              USER FUNCTIONS                  */
    /************************************************/

    /** @dev lets the user to register a new Vehicle, sign a policy and pay a premium
    * @param _brand Brand of the insured Vehicle
    * @param _model Model of the insured Vehicle
    * @param _year Year of the insured Vehicle
    * @param _device Eth address of a Pebble tracker installed into the vehicle
    */
    function signPolicy(string memory _brand, string memory _model, string memory _year, address _device) public payable {
        require(msg.value > 0, "The premium cannot be 0");
        require(!devices[_device].hasOrder, "This device already has an order");
        require(devices[_device].status == Status.whitelisted, "This device is not approved yet");

        // activate policy holder account if not active yet
        // Todo: move to require()
        if (!holders[msg.sender].isActive) {
            activateAccount(msg.sender);
        }

        // Todo: move to a separate function
        bytes32 _vehicleId = registerVehicle(_brand, _model, _year);  // register vehicle
        // policy
        bytes32 hash = keccak256(abi.encodePacked(msg.sender, _vehicleId, _device, msg.value));  // generate ID for Policy
        uint256 toLock = holders[msg.sender].multiplier * msg.value;  // calculate an amount to lock by smart contract
        require(toLock <= balance, "The contract balance is insufficient to guarantee this policy");
        policies[hash] = Policy(true, msg.sender, _vehicleId, _device, msg.value, toLock, 0);  // create a new policy
        policyIDs.push(hash);  // record new policy id
        // contract
        balance -= toLock;  // remove guarantee funds locked into the policy
        balance += msg.value;  // add premium payed by the user
        // device
        devices[_device].policy = hash;  // connect device to the policy
        devices[_device].hasOrder = true;  // activate device (Todo: remove)
        // user
        holders[msg.sender].policies.push(hash);  // add policy to user's policies
    }

    /** @dev lets the user to claim funds, user pays 10% of repair
    * @param _partner Eth address of the partner
    * @param _policy Id of the Policy associated with the vehicle
    */
    function payRepair(address payable _partner, bytes32 _policy) public payable {
        require(msg.value > 0, "The repair fee should be more than 0");
        require(partners[_partner].registered, "The given partner address doesn't exist among registered partners");
        require(policies[_policy].policyHolder == msg.sender, "Only the holder of the policy can claim funds");

        // maximum amount of funds claimable from the chosen policy with applied penalty multiplier
        uint256 claimable = holders[msg.sender].penaltyMultiplier * policies[_policy].locked / theta;
        // the amount of funds that user claims without applying penalties
        uint256 cleanGrant = holders[msg.sender].multiplier * msg.value;
        // the amount of funds that user claims with applying penalties
        uint256 grant = cleanGrant * holders[msg.sender].penaltyMultiplier / theta;
        require(grant <= claimable, "The claimable amount exceeds the limit");

        uint256 toPay = msg.value + grant;  // the funds that the contract should transfer to the partner
        policies[_policy].locked -= cleanGrant;  // remove claimed funds from the policy
        policies[_policy].fundsUsed += grant;  // record the claimed funds amount

        _partner.transfer(toPay);
    }

    /************************************************/
    /*              SERVER FUNCTIONS                */
    /************************************************/

    /** @dev lets the server to record a data point received from a device
    * @param _accel1, _accel2, _accel3 Values of 3-axis accelerometer
    * @param _latitude, _longitude Values of GPS
    * @param _random randomly openssl generated hex string
    * @param _timestamp Timestamp of message creation
    * @param _r, _s fist and second half of a signature, generated with a private key of a Pebble device
    */
    function receiveMessage(
        string memory _accel1, string memory _accel2, string memory _accel3, string memory _latitude, string memory _longitude,
        string memory _random, string memory _timestamp, bytes32 _r, bytes32 _s
    ) public {
        // Message recreation for verification
        string memory _message = string(abi.encodePacked(
                "{\"message\":{\"accelerometer\":[", _accel1 ,",", _accel2 ,",", _accel3, "],\"latitude\":",
                _latitude, ",\"longitude\":", _longitude, ",\"timestamp\":\"", _timestamp, "\",\"random\":\"", _random, "\"}}"
            ));

        bytes32 hash = keccak256(bytes(_message));
        require(keccak256(abi.encodePacked(dataPoints[hash].random)) == keccak256(abi.encodePacked('')), "Such datapoint already exists");

        address _deviceId = verifyMessage(hash, _r, _s);
        require(!(_deviceId == address(0)), "This message didn't pass the verification");
        // prevent the message inflow from inactive devices
        // If the message isn't verified the transaction signer doesn't need to pay gas for transaction until this point
        require(devices[_deviceId].hasOrder, "This device has no order yet");
        // generate datapoint id
        dataPoints[hash] = DataPoint([_accel1, _accel2, _accel3], _latitude, _longitude, _random, _timestamp);
        // find the holder of the device that created the message
        address holder = policies[devices[_deviceId].policy].policyHolder;
        applyPenalty(holder, hash);
    }

    /** @dev lets the server to deactivate an expired policy
    * @param _policy ID of the policy
    */
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
        // Todo: only in the case if the user had no penalties
        updateRating(policies[_policy].policyHolder, true);

        balance += unlocking;
    }

    /************************************************/
    /*              UTILITY FUNCTIONS               */
    /************************************************/

    function activateAccount(address _holderAddress) internal {
        require(!holders[_holderAddress].isActive, "The account has already been activated");
        holders[_holderAddress].isActive = true;
        holders[_holderAddress].rating = initialRating;
        holders[_holderAddress].multiplier = alpha * initialRating;
        holders[_holderAddress].penaltyMultiplier = theta;
        holdersIDs.push(_holderAddress);
    }

    /** @dev updates users multiplier based on alpha and user's rating */
    function updateMultiplier(address _holderAddress) internal {
        holders[_holderAddress].multiplier = alpha * holders[_holderAddress].rating;
    }

    /** @dev updates the rating of the user after getting a bonus or a penalty
    * @param _holderAddress Eth address of the user
    * @param _positive True if bonus, false if penalty
    */
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

    /** @dev verifies a message that was signed with elliptic curve algorithm
    * @param _hash keccak256 hash of the initial message
    * @param _r, _s fist and second half of a signature, generated with a private key of a Pebble device
    * @return _deviceId address of the recovered signer
    */
    function verifyMessage(bytes32 _hash, bytes32 _r, bytes32 _s) internal view returns(address _deviceId) {
        // depending on the version of a pebble device the user is using
        // it can implement one of two versions of signature
        // in the first version v = 27, the second one v = 28
        // In case of elliptic curve we will have two possible signers
        for (uint8 v = 27; v < 29; v++) {
            _deviceId = ecrecover(_hash, v, _r, _s);
            // if the retrieved address is already registered,
            // we can think that the message integrity and source are correct
            if (devices[_deviceId].status == Status.whitelisted) {
                return(_deviceId);
            }
        }
        return address(0);  // if no such addresses registered, return address of zero
    }

    function applyPenalty(address _holder, bytes32 _dataPoint) internal {
        holders[_holder].penalties.push(_dataPoint);  // save penalty
        // update user's penalty multiplier
        uint256 _penaltyMultiplier = holders[_holder].penaltyMultiplier;
        _penaltyMultiplier -= 1;
        // penalty multiplier cannot be 0, or user won't be able to claim funds at all
        if (_penaltyMultiplier > 0) {
            holders[_holder].penaltyMultiplier = _penaltyMultiplier;
        }
    }


    /************************************************/
    /*                  GETTERS                     */
    /************************************************/

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