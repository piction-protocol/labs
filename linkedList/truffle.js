/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */
//var HDWalletProvider = require("truffle-hdwallet-provider-privkey");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    }//,
    // ropsten: {
    //   provider: new HDWalletProvider("D83B65147B652A065F812846B37E721A81A52BAEDF6DFA1A5F69608C7E15E522", "https://ropsten.infura.io/"),
    //   network_id: 3,
    //   gas: 7000000,
    //   gasPrice: 100000000000
    // },
    // private: {
    //   provider: new HDWalletProvider("D83B65147B652A065F812846B37E721A81A52BAEDF6DFA1A5F69608C7E15E522", "http://54.249.219.254:8545/"),
    //   network_id: 2880,
    //   gas: 0,
    //   gasPrice: 0
    // }
  }
};

