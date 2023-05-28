// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GUSDToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("GnosisUSD", "GUSD") {
        uint256 totalSupply = initialSupply * 10 ** 18;
        _mint(msg.sender, totalSupply);
    }
}