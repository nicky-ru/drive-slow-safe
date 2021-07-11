const DriveSlowSafe = artifacts.require("DriveSlowSafe");

module.exports = function (deployer) {
    // for now we will fund the smart contract directrly upon deploying
    // but later we will implement a special function for funding the contract

    /************************************************/
    /*     Step 2: choose admin and initial funds   */
    /************************************************/
    deployer.deploy(DriveSlowSafe, {
        from: "0xE9cebA328C78a43A492463f72DE80e4e1a2Df04d",
        value: 1000000000000000000
    });
};
