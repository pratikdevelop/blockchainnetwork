// Import Hardhat libraries
const { ethers } = require("hardhat");

async function main() {
    // Get the contract factory for your contract (SolarBlockchain in this case)
    const SolarBlockchain = await ethers.getContractFactory("EnergyToken");

    // Deploy the contract
    const solarBlockchain = await SolarBlockchain.deploy();

    console.log("SolarBlockchain contract deployed to:", solarBlockchain.address);
}

// Run the main function and handle any errors
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

// 