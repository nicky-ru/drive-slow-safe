const DriveSlowSafe = artifacts.require("DriveSlowSafe");

module.exports = function (deployer) {
    deployer.deploy(DriveSlowSafe, {from: "0xF26a43cb8FF1fa90b603152B845A3E2de9c5Ba6F", value: 1000000000000000000});
};
