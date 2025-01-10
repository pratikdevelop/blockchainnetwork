// Load environment variables (e.g., mnemonic and Alchemy API key)
require('dotenv').config();
const { MNEMONIC, ALCHEMY_API_KEY } = process.env;

// Use HDWalletProvider to sign transactions
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  /**
   * Networks define how you connect to your Ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a managed Ganache instance for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g.
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Local development network (Ganache)
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Ganache default port
      network_id: "5777",     // Ganache network ID (default: none)
    },
    
    // Goerli Testnet (for testing before mainnet)
    goerli: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://goerli.infura.io/v3/${ALCHEMY_API_KEY}`),
      network_id: 5,       // Goerli's network ID
      confirmations: 2,    // Number of confirmations to wait before proceeding with deployment
      timeoutBlocks: 200,  // Number of blocks before a deployment times out
      skipDryRun: true,    // Skip dry run before migrations (default: false)
    },

    // Mainnet (Ethereum Mainnet) using Alchemy
    mainnet: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`),
      network_id: 1,       // Ethereum Mainnet network ID
      gas: 5500000,        // Maximum gas for transactions
      gasPrice: 10000000000,  // Gas price in wei (10 gwei here)
      confirmations: 2,    // Number of confirmations to wait before proceeding with deployment
      timeoutBlocks: 200,  // Number of blocks before a deployment times out
      skipDryRun: true,    // Skip dry run before migrations (default: false)
    },

    // Optional: Custom private network example (uncomment if needed)
    // private: {
    //   provider: () => new HDWalletProvider(MNEMONIC, `https://network.io`),
    //   network_id: 2111,   // Custom network ID
    //   production: true    // Treats this network as if it were public
    // }
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.21", // Solidity version (update as needed)
    }
  },

  // Truffle DB (currently disabled by default, enable if needed)
  // db: {
  //   enabled: false,
  //   host: "127.0.0.1",
  //   adapter: {
  //     name: "indexeddb",
  //     settings: {
  //       directory: ".db"
  //     }
  //   }
  // }
};
