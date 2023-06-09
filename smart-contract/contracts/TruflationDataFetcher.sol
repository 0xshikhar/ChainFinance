// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";

contract TruflationDataFetcher is
    ChainlinkClient,
    KeeperCompatibleInterface
{
    using Chainlink for Chainlink.Request;

    string public yoyInflation;

    bytes public result;
    mapping(bytes32 => bytes) public results;

    address public chainlinkContract = 0x326C977E6efc84E512bB9C30f76E30c160eD06FB;

    address public oracleId;
    string public jobId;
    uint256 public fee;
    address public owner;


    uint public immutable interval;
    uint public lastTimeStamp;

    bool runKeeper;

    /**
    Network Details derived from Market.Chainlink Truflation Mumbai
    https://market.link/nodes/969f6cd9-40f3-4dd6-aa02-4fa8c8421480/integrations
   */
       constructor() {
    setChainlinkToken(chainlinkContract);
        oracleId = 0x6D141Cf6C43f7eABF94E288f5aa3f23357278499;
        jobId = "d220e5e687884462909a03021385b7ae";
        fee = 5 * 10 ** 17;
        interval = 300;
        lastTimeStamp = block.timestamp;
        runKeeper = true;
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

    function fulfillYoyInflation(
        bytes32 _requestId,
        bytes memory _inflation
    ) public recordChainlinkFulfillment(_requestId) {
        yoyInflation = string(_inflation);
    }

    // function for getting other categories data 

    function doRequest(
        string memory service_,
        string memory data_,
        string memory keypath_,
        string memory abi_,
        string memory multiplier_) public returns (bytes32 requestId) {
          Chainlink.Request memory req = buildChainlinkRequest(
            bytes32(bytes(jobId)),
            address(this), this.fulfillBytes.selector);
        req.add("service", service_);
        req.add("data", data_);
        req.add("keypath", keypath_);
        req.add("abi", abi_);
        req.add("multiplier", multiplier_);
        return sendChainlinkRequestTo(oracleId, req, fee);
    }

    function fulfillBytes(bytes32 _requestId, bytes memory bytesData)
        public recordChainlinkFulfillment(_requestId) {
        result = bytesData;
        results[_requestId] = bytesData;
    }

    /**
    Keepers functions

    Intended to run daily to refresh inflation data.
    Running every 5 minutes for hackathon purposes currently
  */
    function checkUpkeep(
        bytes calldata checkData
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory performData)
    {
        bool timeToStart = (block.timestamp - lastTimeStamp) > interval;
        upkeepNeeded = runKeeper && timeToStart;
        performData = checkData;
    }

    function performUpkeep(bytes calldata performData) external override {
        lastTimeStamp = block.timestamp;
        //Sync Truflation Values for User:
        requestYoyInflation();
        performData;
    }

    /**
    Utility functions
    */

    function enableKeeper() public onlyOwner {
        runKeeper = true;
    }

    function disableKeeper() public onlyOwner {
        runKeeper = false;
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

    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }
      modifier onlyOwner() {
      require(msg.sender == owner);
      _;
  }
}

