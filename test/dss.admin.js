const DriveSlowSafe = artifacts.require("DriveSlowSafe");
const should = require("chai").should();
const utils = require("./helpers/utils");

contract("DriveSlowSafe", (accounts) => {
    let contractInstance;
    const admin = accounts[0];
    const user = accounts[1];
    const deviceId = "0xAF1F560f18E03A67a7Fe3E11461B008C5a451ab0";
    const deviceImei = "390960670587292";

    context("Admin", () => {
        beforeEach(async () => {
            const initialFund = 1000000000000000000;
            contractInstance = await DriveSlowSafe.new({from: admin, value: initialFund});
        });
        afterEach(async () => {
            await contractInstance.kill();
        })
        it("can add new device", async () => {
            await contractInstance.approveDevice(deviceId, deviceImei, {from: admin});

            const device = await contractInstance.devices(deviceId);
            device.imei.should.equal(deviceImei);
            device.hasOrder.should.equal(false);
            BigInt(device.status).should.equal(BigInt(1));
            BigInt(device.policy, 32).should.equal(BigInt(0, 32));
        });
        it("can't add two devices with similar id", async () => {
            await contractInstance.approveDevice(deviceId, deviceImei, {from: admin});
            await utils.shouldThrow(contractInstance.approveDevice(deviceId, deviceImei, {from: admin}))
        })
    })
    context("User", () => {
        beforeEach(async () => {
            const initialFund = 1000000000000000000;
            contractInstance = await DriveSlowSafe.new({from: admin, value: initialFund});
        });
        afterEach(async () => {
            await contractInstance.kill();
        })
        it("can't approve new device", async () => {
            await utils.shouldThrow(contractInstance.approveDevice(deviceId, deviceImei, {from: user}))
        });
    })
})