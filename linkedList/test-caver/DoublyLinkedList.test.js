const Caver = require('caver-js');
const caver = new Caver(new Caver.providers.HttpProvider(`http://node`));
const BigNumber = require('bignumber.js');
const gasPrice = '25000000000'

const fs = require('fs');
const input = JSON.parse(fs.readFileSync('build/contracts/DoublyLinkedList.json'));
const contract = new caver.klay.Contract(input.abi);

console.log(`>>>>>>>>>> [DoublyLinkedList] <<<<<<<<<<`);

test();

async function test() {

    console.log(`>>>>>>>>>> [Async Start] <<<<<<<<<<`);
    caver.klay.accounts.wallet.add('0xPKey');

    let instance = await contract.deploy({
        data: input.bytecode,
        arguments: []
    }).send({
        from: caver.klay.accounts.wallet[0].address,
        gas: 2000000,
        gasPrice: gasPrice
    }); 

    let doublyLinkedList = new caver.klay.Contract(input.abi, instance.contractAddress);
    let before = Date.now();
    console.log(`>>>>>>>>>> [AddUser] <<<<<<<<<< before: `+before);
    await doublyLinkedList.methods.addUser(0).send({
        from: caver.klay.accounts.wallet[0].address,
        gas: 100000,
        gasPrice: gasPrice
    }).then((result) => {
        let after = Date.now();
        console.log(`>>>>>>>>>> [AddUser END] <<<<<<<<<< after : `+ after +` time :` +  (after - before));
        console.log(`result : `+result);
    })

    before = Date.now();
    console.log(`>>>>>>>>>> [getUserList] <<<<<<<<<< before: `+before);
    await doublyLinkedList.methods.getUserList().call({
        from: caver.klay.accounts.wallet[0].address,
        gas: 1000000000,
        gasPrice: gasPrice
    }).then((result) => {
        let after = Date.now();
        console.log(`>>>>>>>>>> [getUserList END] <<<<<<<<<< after : `+ after +` time :` +  (after - before));
        console.log(`getUserList : `+result);    
    });

    console.log(`>>>>>>>>>> [END] <<<<<<<<<<`);
};