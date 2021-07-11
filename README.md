#DriveSlowSafe
Welcome!
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

## Project structure
This repo contains three branches:
1) drive-slow-safe-react (WebUI)
2) drive-slow-safe-sc (Smart Contracts)
3) drive-slow-safe-server (Server side)

## Installation

Use the git to install the project.

SmartContract:
```
git clone --single-branch --branch drive-slow-safe-sc https://github.com/nicky-ru/drive-slow-safe.git ./drive-slow-safe-sc
```
WebUI:
```
git clone --single-branch --branch drive-slow-safe-react https://github.com/nicky-ru/drive-slow-safe.git ./drive-slow-safe-react
```
Server:
```
git clone --single-branch --branch drive-slow-safe-server https://github.com/nicky-ru/drive-slow-safe.git ./drive-slow-safe-server
```
## Getting Started with the project
The project setup consists of the following three steps:
1) Smart Contract setup and deployment
2) WebUI setup and build
3) Server start
4) Device registration

## Step 1: Smart Contract setup
Here are the steps for configure and deploy the smart contract.
### Step 1.1: Secret key
In the `./truffle-config.js` file set a path to admin private key.

### Step 1.2: Admin and Funds
In the `./migrations/2_contract_migration.js` file set the admin address and a reasonable amount of funds to lock.

```javascript
deployer.deploy(DriveSlowSafe, {
        from: "ADMIN_ADDRESS",
        value: VALUE_TO_LOCK
    });
```

Pay attention, that if the amount of locked funds will be not enough to guarantee Policies, users won't be able to 
sign policies.

### Step 1.3: Multipliers
In the `./contracts/driveSlowSafe.sol` change the multipliers values according to your requirements.\
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
You can find ABI here `./build/contracts/DriveSlowSafe.json`. In the next steps we will use the contract address and the ABI.

## Step 2: WebUI setup
Todo
## Step 3: Server setup
Todo
## Step 4: Device registration
Todo
## Usage
Todo
## Roadmap
Todo
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)