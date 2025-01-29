/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");

require('dotenv').config();
module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/bmiVgPod-xjeKmVKqg14-HITIfvtTt2Z`,
      accounts: ["0x06c937da22385b53cbc88983d40858bd3ce40536dd1dbdb318ee7e924838cdd6"]
    }
  }
};
