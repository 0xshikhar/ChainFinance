// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract RandomnessConsumer is VRFConsumerBase {
    bytes32 internal keyHash =
        0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4;
    uint256 internal feeRandomness = 100000000000000; // 0.0001 LINK
    uint256 public randomResult;

    // Mumbai Testnet
    // Chainlink VRF Coordinator address: 0x8C7382F9D8f56b33781fE506E897a4F1e2d17255
    // LINK token address:                0x326C977E6efc84E512bB9C30f76E30c160eD06FB
    // Key Hash: 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4

    constructor()
        VRFConsumerBase(
            0x8C7382F9D8f56b33781fE506E897a4F1e2d17255, // VRF Coordinator
            0x326C977E6efc84E512bB9C30f76E30c160eD06FB // LINK Token
        )
    {}

    function getRandomNumber() public returns (bytes32 requestId) {
        require(
            LINK.balanceOf(address(this)) >= fee,
            "Not enough LINK - fill contract with faucet"
        );
        return requestRandomness(keyHash, feeRandomness);
    }

    function fulfillRandomness(
        bytes32 requestId,
        uint256 randomness
    ) internal override {
        randomResult = randomness;
        // randomness % (max - min + 1) + min
    }

    function withdrawLink() external {
        require(
            LINK.transfer(msg.sender, LINK.balanceOf(address(this))),
            "Unable to transfer"
        );
    }
}
