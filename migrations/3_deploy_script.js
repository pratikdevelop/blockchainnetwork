const MyToken = artifacts.require("MyToken");

module.exports = async function (deployer, network, accounts) {
    // Deploy with an initial supply of 1 million tokens (for example)
    await deployer.deploy(MyToken, 1000000);
    const token = await MyToken.deployed();
    console.log(`MyToken contract deployed at: ${token.address}`);
};
