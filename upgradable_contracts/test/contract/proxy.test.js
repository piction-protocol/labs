const Proxy = artifacts.require("Proxy");
const DataV0 = artifacts.require("DataV0");
const DataV1 = artifacts.require("DataV1");
const DataV2 = artifacts.require("DataV2");
const DataV3 = artifacts.require("DataV3");

const BigNumber = web3.BigNumber;

require("chai")
    .use(require("chai-as-promised"))
    .use(require("chai-bignumber")(BigNumber))
    .should();

contract("Proxy contract test", async function (accounts){
    const account = accounts[0];

    let proxy;
    let dataV0;
    let dataV1;
    let dataV2;
    let dataV3;

    before("Deploy contract", async() => {
        proxy = await Proxy.new({from: account});
        dataV0 = await DataV0.new({from: account});
        dataV1 = await DataV1.new({from: account});
        dataV2 = await DataV2.new({from: account});
        dataV3 = await DataV3.new({from: account});

        console.log("deploy contract address..............")
        console.log("proxy contract address: " + proxy.address);
        console.log("dataV0 contract address: " + dataV0.address);
        console.log("dataV1 contract address: " + dataV1.address);
        console.log("dataV2 contract address: " + dataV2.address);
        console.log("dataV3 contract address: " + dataV3.address);
        console.log();
    });

    it("proxy test dataV0", async() => {
        console.log("proxy test dataV0........");
        let target;
        let result;
        let proxyContract;

        target = await proxy.getTargetAddress();
        console.log("target address(before): " + target);

        console.log("change target address");        
        await proxy.setTargetAddress(dataV0.address);
        target = await proxy.getTargetAddress();
        console.log("target address(DataV0 address): " + target);
        target.should.be.equal(dataV0.address);
        console.log();

        proxyContract = await DataV0.at(proxy.address);

        result = await proxyContract.getCount();
        result.toNumber().should.be.equal(0);

        await proxyContract.purchase();
        result = await proxyContract.getCount();
        result.toNumber().should.be.equal(1);
        console.log("purchase count : " + result);

        console.log("end....................");
        console.log();
        console.log();
        console.log();
    });

    it("change target address & test dataV1", async() =>{
        console.log("change target address & test dataV1........");
        let target;
        let result;
        let proxyContract;

        target = await proxy.getTargetAddress();
        console.log("target address(DataV0 address): " + target);
        target.should.be.equal(dataV0.address);

        console.log("change target address");
        await proxy.setTargetAddress(dataV1.address);
        target = await proxy.getTargetAddress();
        console.log("target address(DataV1 address): " + target);
        target.should.be.equal(dataV1.address);
        console.log();

        proxyContract = await DataV1.at(proxy.address);

        result = await proxyContract.getCount();
        console.log("purchase count(before) : " + result);
        result.toNumber().should.be.equal(1);
        await proxyContract.newPurchase();
        result = await proxyContract.getCount();
        console.log("purchase count(after) : " + result);
        result.toNumber().should.be.equal(3);

        console.log("end....................");
        console.log();
        console.log();
        console.log();
    });

    it("Additional testing of variables", async() => {
        console.log("Additional testing of variables........");
        let target;
        let result;
        let proxyContract;

        target = await proxy.getTargetAddress();
        console.log("target address(DataV1 address): " + target);
        target.should.be.equal(dataV1.address);

        console.log("change target address");
        await proxy.setTargetAddress(dataV2.address);
        target = await proxy.getTargetAddress();
        console.log("target address(DataV2 address): " + target);
        target.should.be.equal(dataV2.address);
        console.log();

        proxyContract = await DataV2.at(proxy.address);

        result = await proxyContract.getTitle();
        console.log("title (before) : " + result);

        await proxyContract.setTitle();
        result = await proxyContract.getTitle();
        console.log("result (piction network) : " + result);
        result.should.be.equal("piction network");
        
        console.log("end....................");
        console.log();
        console.log();
        console.log();
    });

    it("Inheritance contract test", async() => {
        console.log("Inheritance contract test........");
        let target;
        let result;
        let proxyContract;

        target = await proxy.getTargetAddress();
        console.log("target address(dataV2 address): " + target);
        target.should.be.equal(dataV2.address);

        console.log("change target address");
        await proxy.setTargetAddress(dataV3.address);
        target = await proxy.getTargetAddress();
        console.log("target address: " + target);
        target.should.be.equal(dataV3.address);
        console.log();

        proxyContract = await DataV3.at(proxy.address);

        result = await proxyContract.getVariable();
        console.log("count(before) : " + result[0]);
        result[0].toNumber().should.be.equal(3);
        console.log("title(before) : " + result[1]);
        result[1].should.be.equal("piction network");
        
        console.log();
        console.log("modify contract variables");
        await proxyContract.modifyVariable();
        result = await proxyContract.getVariable();
        console.log("count(after) : " + result[0]);
        result[0].toNumber().should.be.equal(100);
        console.log("title(after) : " + result[1]);
        result[1].should.be.equal("maxim comics");
        
        console.log("end....................");
        console.log();
        console.log();
        console.log();
    });
});