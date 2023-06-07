// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";

contract TruflationDataFetcher is
    ChainlinkClient,
    ConfirmedOwner,
    KeeperCompatibleInterface
{
    using Chainlink for Chainlink.Request;

    string public yoyInflation;

    bytes public result;
    mapping(bytes32 => bytes) public results;

    //Category Inflations (will be replaced later with results mapping to save storage gas) :
    string public foodInflation;
    string public housingInflation;
    string public transportationInflation;
    string public medicalInflation;
    string public educationInflation;
    string public personalItemInflation;

    address public oracleId;
    string public jobId;
    uint256 public fee;

    uint public immutable interval;
    uint public lastTimeStamp;

    bool runKeeper;

    /**
    Network Details derived from Market.Chainlink Truflation Mumbai
    https://market.link/nodes/969f6cd9-40f3-4dd6-aa02-4fa8c8421480/integrations
   */
    constructor() ConfirmedOwner(msg.sender) {
        setPublicChainlinkToken();
        oracleId = 0x6D141Cf6C43f7eABF94E288f5aa3f23357278499;
        jobId = "d220e5e687884462909a03021385b7ae";
        fee = 500000000000000000;
        interval = 300;
        lastTimeStamp = block.timestamp;
        runKeeper = true;
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
        simulateRequestForCategoryInflations();
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
}
//old deploy: 0x4a44d3E4F061bce81ab82DE0E67383F69E7967A5
//deploy : 0xaE02354d16019b1A6dA8c2E184Fe9903cEacD785

//test counter contract: 0x952cEe3d68AF8DC09A3501CaD8f444Da1942cc91
