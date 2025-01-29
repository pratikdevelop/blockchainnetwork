// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./EnergyToken.sol";

contract Validator is Ownable {
    EnergyToken public energyToken;
    uint256 public blockReward = 10;  // Reward for each block created (e.g., 10 tokens)

    constructor(address tokenAddress) {
        energyToken = EnergyToken(tokenAddress);
    }

    // Function to simulate block creation and reward distribution
    function createBlock(address validator) external onlyOwner {
        uint256 reward = blockReward;
        energyToken.mint(validator, reward);
    }
}
