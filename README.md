# DriveSlowSafe

This repo contains three branches: 
1) drive-slow-safe-react (WebUI)
2) drive-slow-safe-sc (Smart Contracts)
3) drive-slow-safe-server (Server side)

## About the project

An insurance company gets and registers Pebble Devices. It also deploys the smart contract and registers
partners (local car repair shops);

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