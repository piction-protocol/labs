const SinglyLinkedList = artifacts.require("SinglyLinkedList");

const BigNumber = web3.BigNumber;

require("chai")
    .use(require("chai-as-promised"))
    .use(require("chai-bignumber")(BigNumber))
    .should();

contract("Proxy contract test", async function (accounts){
    const account = accounts[0];
    let count = 1;
    let list;

    before("Deploy contract", async() => {
        list = await SinglyLinkedList.new({from: account});
    });

    it("SinglyLinkedList add", async() => {
        for (let i = 0; i < count; i++) {
            await list.addUser(i , {from: account})
        }
    });

    it ("get list users", async() => {
        await list.getUserList.call({from: account});
    })

    it ("remove user", async() => {
        for (let i = 0; i < count; i++) {
            await list.removeUser(i , {from: account})
        }
    })

    it("SinglyLinkedList add", async() => {
        for (let i = 0; i < count; i++) {
            await list.addUser(i , {from: account})
        }
    });

    it ("revers remove user", async() => {
        for (let i = (count-1); i >=0; i--) {
            await list.removeUser(i , {from: account})
        }
    })

    it ("end test", async() => {
        await list.getListLength.call({from: account})
    })
});