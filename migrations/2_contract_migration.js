const DriveSlowSafe = artifacts.require("DriveSlowSafe");

module.exports = function (deployer) {
    deployer.deploy(DriveSlowSafe);
};
