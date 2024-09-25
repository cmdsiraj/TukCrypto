// contracts/TukCoin.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TukCoin is ERC20, Ownable {
    // Initial supply of TukCoins
    uint256 public constant INITIAL_SUPPLY = 10000 * 10 ** 18; // 10,000 TC with 18 decimals

    constructor() ERC20("TukCoin", "TC") Ownable(msg.sender) {
        // Mint initial supply to the contract deployer (owner)
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    // Allow users to mint additional TukCoins
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Faucet function for contract owner to mint coins for testing purposes
    function faucet() public onlyOwner {
        _mint(msg.sender, 1000 * 10 ** 18); // Mint 1000 TC for testing
    }
}
