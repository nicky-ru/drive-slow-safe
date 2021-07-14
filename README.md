# DriveSlowSafe
Welcome!
## Contents:
- [Description](https://github.com/nicky-ru/drive-slow-safe#description)
- [Demo](https://github.com/nicky-ru/drive-slow-safe#demo)
- [Project Structure](https://github.com/nicky-ru/drive-slow-safe#project-structure)
- [Prerequisites](https://github.com/nicky-ru/drive-slow-safe#prerequisites)
- [Getting Started](https://github.com/nicky-ru/drive-slow-safe#getting-started-with-the-project)
    - [Installation](https://github.com/nicky-ru/drive-slow-safe#installation)
    - [Step 1](https://github.com/nicky-ru/drive-slow-safe#step-1-smart-contract-setup)
    - [Step 2](https://github.com/nicky-ru/drive-slow-safe#step-2-webui-setup)
    - [Step 3](https://github.com/nicky-ru/drive-slow-safe#step-3-server-setup)
    
- [Usage](https://github.com/nicky-ru/drive-slow-safe#usage)
- [Roadmap](https://github.com/nicky-ru/drive-slow-safe#roadmap)
- [Contributing](https://github.com/nicky-ru/drive-slow-safe#contributing)
- [License](https://github.com/nicky-ru/drive-slow-safe#license)

## Description
An insurance company gets and registers Pebble Devices. It also deploys the smart contract and registers
partners (local car repair shops).

Each user gets a device and installs it into his car. He needs to sign a policy on Dapp Website.
After signing a policy the Pebble device is being activated and starts to track the speed of the
vehicle.

If the user exceeds the speed limit, the Server will send the datapoint of the speeding to the Smart Contract, i.e.
register a penalty, i.e the penalty multiplier of the Policy Holder will decrease leading to lower funding capability.

If policy period finishes, the rating of the Policy Holder will increment by 1, increasing the funding capability.

When signing a policy, a certain amount of money will be locked into the Policy, which will guarantee the capability
of the contract to fund a repairment. When the Policy Holder claims the repairment funds, he will pay
10% of the sum and 90% of the claimed amount is covered by the Contract. The funds don't go to the
Holder's address, but they will transferred to the registered Partner (car repair shop). The Policy Holder
can choose one of the approved Partners.

When the User had no accidents and did't claim the funds, the Policy will be deactivated after certain
period of time and the remaining locked funds will be unlocked back to the Smart Contract.
This is the branch used for storing the Server side of the project.
## Demo
[Here is a link to a demo published on YouTube](https://youtu.be/sXz3-jyW21Q)

[Here is a link to a deployed website](https://drive-slow-safe-react.d14gz7bhl27u40.amplifyapp.com/)
## Project structure
This repo contains three branches:
1) drive-slow-safe-react (WebUI)
2) drive-slow-safe-sc (Smart Contracts)
3) drive-slow-safe-server (Server side)
## Prerequisites
- IoT backend ready for receiving and storing messages from Pebble Tracker (AWS IoT + AWS S3);
- [Metamask](https://metamask.io/) plugin installed;
## Getting Started with the project
The project setup consists of the following three steps:
1) Smart Contract setup and deployment
2) WebUI setup and build
3) Server start
## Installation
Use the git to install the project.
- SmartContract:
```
git clone --single-branch --branch drive-slow-safe-sc https://github.com/nicky-ru/drive-slow-safe.git ./drive-slow-safe-sc
```
- WebUI:
```
git clone --single-branch --branch drive-slow-safe-react https://github.com/nicky-ru/drive-slow-safe.git ./drive-slow-safe-react
```
- Server:
```
git clone --single-branch --branch drive-slow-safe-server https://github.com/nicky-ru/drive-slow-safe.git ./drive-slow-safe-server
```
## Step 1: Smart Contract setup
Here are the steps for configure and deploy the smart contract.
### Step 1.1: Secret key
In the `drive-slow-safe-sc/truffle-config.js` file set a path to admin private key.
### Step 1.2: Admin and Funds
In the `drive-slow-safe-sc/migrations/2_contract_migration.js` file set the admin address and a reasonable amount of funds to lock.
```javascript
deployer.deploy(DriveSlowSafe, {
        from: "ADMIN_ADDRESS",
        value: VALUE_TO_LOCK
    });
```
Pay attention, that if the amount of locked funds will be not enough to guarantee Policies, users won't be able to 
sign policies.
### Step 1.3: Multipliers
In the `drive-slow-safe-sc/contracts/driveSlowSafe.sol` change the multipliers values according to your requirements.\
By default the values are as follows:
```solidity
    uint32 private alpha = 2;  // to calculate multipliers of users
    uint32 private theta = 1000; // to calculate penalty multiplier
```
Suppose that when a new user signs a policy we will have Premium `(P)` set by the user, 
User's rating `(R)`, User's penalty multiplier `(PM)`, Contract initial multiplier `(Alpha)`,
Contract penaly multiplier divisor `(Theta)`. Simply said, the total amount of money, that 
a Policy Holder could claim:\
`Claimable = P * R * Alpha * (PM / Theta)`
#### Example:
A new user without penalties with Alpha = 2, PM = 1000 and premium set to 100 000 IOTX could claim
200 000 IOTX.
If user has got one penalty, i.e PM = 999, the calimable amount with the same Alpha and PM variables will be 199 800 IOTX.
### Step 1.4: Deploy
In the command line run the code:
```bash
truffle migrate --reset --network dev
```
If the transaction was successful, note the address of the deployed DriveSlowSafe contract and ABI of the contract.
You can find ABI here `drive-slow-safe-sc/build/contracts/DriveSlowSafe.json`. In the next steps we will use the contract address and the ABI.
## Step 2: WebUI setup
Here are the steps to prepare and build the WebUI.
### Step 2.1: Contract address
In `drive-slow-safe-react/src/contract/driveSlowSafe.js` set the contract address to the one from step 1.4.
### Step 2.2: Contract Abi
In `drive-slow-safe-react/src/contract/driveSlowSafeAbi.js` set the contract Abi to the one from step 1.4.
### Step 2.3: Build
In command line run
```bash
yarn build
```
## Step 3: Server setup
Here are the steps to prepare and run the server for handling messages from Pebble Tracker.
### Step 3.1: Contract address
In `drive-slow-safe-server/main.js` set the contract address and admin to the ones from step 1.4.
### Step 3.2: Contract Abi
In `drive-slow-safe-server/main.js` set the contract Abi to the one from step 1.4.
### Step 3.3: Private key
In `drive-slow-safe-server/main.js` set the path to the private key of the admin to sign transactions.
### Step 3.4: AWS
In `drive-slow-safe-server/main.js` set the AWS Backend params: Region, Bucket name and Identity pool
### Step 3.5: Params
In `drive-slow-safe-server/main.js` set the required parameters for speed, time and interval.
### Step 3.6: Run server
In command line run
`npm main.js`
## Usage
Usage of the dapp for admin and user
### Admin
- Register new Pebble Devices in AWS IoT to get certificate, private and public key
- Register a new Pebble Device from admin pannel and send the registered device to a new User.
- Register new partners (trusted car repair shops) from admin panel
- (In future version) Add funds to the contract
### User (Policy Holder)
- Install the received Pebble Tracker into the vehicle
- Sign a policy with the vehicle and device information + pay the Premium
- In case of an accident choose a Car repair shop among **Partners** and claim funds
- More signed policies leads to more Trust in the Holder, i.e., more funds to claim.
#### Notes: 
1) The user needs to pay 10% of the claimed funds and not more than there is locked in the Policy.
2) Claimable funds don't sum up from multiple policies. Claimable amount is based on each Policy independently.
3) One user can sign multiple Policies. One Policy - One device (i.e one Vehicle)
4) Claimable funds cannot be withdrawn to the User's address, but only spent in form of paying for repair service to a chosen **Partner**
## Roadmap
1) Implement IoTeX DID
2) Add more sophisticated insurance formula
3) Add tracking and bonuses for eco-friendliness: noise tracking, gas emissions tracking.
4) **Remove penalties and try to incentivize Users for safe riding with more bonuses and Trust points**.
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)