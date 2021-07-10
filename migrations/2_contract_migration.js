const DriveSlowSafe = artifacts.require("DriveSlowSafe");

module.exports = function (deployer) {
    deployer.deploy(DriveSlowSafe, {from: "0xE9cebA328C78a43A492463f72DE80e4e1a2Df04d", value: 1000000000000000000});
};
