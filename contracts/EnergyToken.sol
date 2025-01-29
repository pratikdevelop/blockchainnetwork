// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EnergyToken is ERC20, Pausable, Ownable {

    // Mapping to track the staked tokens for Proof of Stake (PoS)
    mapping(address => uint256) public stakedBalances;
    uint256 public totalStaked;
    uint256 public rewardRate = 1; // 1% staking reward rate (can be adjusted)

    // Array to keep track of stakers
    address[] public stakerList;

    constructor() ERC20("Energy Token", "ETK") {}

    // Mint new tokens (to represent energy produced)
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    // Stake energy tokens to participate in PoS
    function stake(uint256 amount) external whenNotPaused {
        require(amount > 0, "Cannot stake 0 tokens");
        _transfer(msg.sender, address(this), amount);
        
        if (stakedBalances[msg.sender] == 0) {
            stakerList.push(msg.sender); // Add address to staker list if it's their first stake
        }

        stakedBalances[msg.sender] += amount;
        totalStaked += amount;
    }

    // Unstake energy tokens
    function unstake(uint256 amount) external {
        require(amount <= stakedBalances[msg.sender], "Insufficient staked balance");
        
        stakedBalances[msg.sender] -= amount;
        totalStaked -= amount;
        
        _transfer(address(this), msg.sender, amount);

        if (stakedBalances[msg.sender] == 0) {
            // Remove address from staker list if they unstake all their tokens
            _removeStaker(msg.sender);
        }
    }

    // Internal function to remove a staker from the staker list
    function _removeStaker(address staker) internal {
        for (uint i = 0; i < stakerList.length; i++) {
            if (stakerList[i] == staker) {
                stakerList[i] = stakerList[stakerList.length - 1];
                stakerList.pop();
                break;
            }
        }
    }

    // Distribute staking rewards based on staked amount
    function distributeRewards() external onlyOwner {
        for (uint i = 0; i < stakerList.length; i++) {
            address staker = stakerList[i];
            uint256 reward = (stakedBalances[staker] * rewardRate) / 100;
            _mint(staker, reward);
        }
    }

    // Pause staking or transactions in case of emergency
    function pause() external onlyOwner {
        _pause();
    }

    // Unpause staking or transactions
    function unpause() external onlyOwner {
        _unpause();
    }
}
