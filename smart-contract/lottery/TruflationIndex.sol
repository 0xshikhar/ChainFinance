// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";


contract TruflationTester is ChainlinkClient {
  using Chainlink for Chainlink.Request;
  
  address public owner;
  string public yoyInflation;

  // Mumbai Testnet
  // chainlinkContract = 0x326C977E6efc84E512bB9C30f76E30c160eD06FB;
  // oracleId = 0x17dED59fCd940F0a40462D52AAcD11493C6D8073;  
  // jobId = "e5b99e0a2f79402998187b11f37c56a6";
  // fee = 10000000000000000; // 0.01 LINK;

  address public chainlinkContract = 0x326C977E6efc84E512bB9C30f76E30c160eD06FB;
  address public oracleId = 0x17dED59fCd940F0a40462D52AAcD11493C6D8073;
  string public jobId = "e5b99e0a2f79402998187b11f37c56a6";
  uint256 public fee = 10000000000000000; // 0.01 LINK;

  constructor() {
    setChainlinkToken(chainlinkContract);
    owner = msg.sender;
  }
   
  function requestYoyInflation() public returns (bytes32 requestId) {
    Chainlink.Request memory req = buildChainlinkRequest(
      bytes32(bytes(jobId)),
      address(this),
      this.fulfillYoyInflation.selector
    );
    req.add("service", "truflation/current");
    req.add("keypath", "yearOverYearInflation");
    req.add("abi", "json");
    return sendChainlinkRequestTo(oracleId, req, fee);
  }

  function fulfillYoyInflation(bytes32 _requestId, bytes memory _inflation ) 
    public recordChainlinkFulfillment(_requestId) {
    yoyInflation = string(_inflation);
  }

  function changeOracle(address _oracle) public onlyOwner {
    oracleId = _oracle;
  }

  function changeJobId(string memory _jobId) public onlyOwner {
    jobId = _jobId;
  }

  function getChainlinkToken() public view returns (address) {
    return chainlinkTokenAddress();
  }

  function withdrawLink() public payable onlyOwner {
    LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
    require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
  }

  modifier onlyOwner() {
      require(msg.sender == owner);
      _;
  }

/*
  // The following are for retrieving inflation in terms of wei
  // This is useful in situations where you want to do numerical
  // processing of values within the smart contract

  uint256 public inflationWei;
  function requestInflationWei() public returns (bytes32 requestId) {
    Chainlink.Request memory req = buildChainlinkRequest(
      bytes32(bytes(jobId)),
      address(this),
      this.fulfillInflationWei.selector
    );
    req.add("service", "truflation/current");
    req.add("keypath", "yearOverYearInflation");
    req.add("abi", "uint256");
    req.add("multiplier", "1000000000000000000");
    return sendChainlinkRequestTo(oracleId, req, fee);
  }

  function fulfillInflationWei(
    bytes32 _requestId,
    bytes memory _inflation
  ) public recordChainlinkFulfillment(_requestId) {
    inflationWei = toUint256(_inflation);
  }

  function toUint256(bytes memory _bytes) internal pure
  returns (uint256 value) {
    assembly {
      value := mload(add(_bytes, 0x20))
    }
  }
*/
}
