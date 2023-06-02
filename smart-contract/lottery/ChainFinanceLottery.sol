// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract ChainFinanceLottery is ChainlinkClient, VRFConsumerBase {
    using Chainlink for Chainlink.Request;

    enum LOTTERY_STATE {
        OPEN,
        CLOSED,
        CALCULATING_WINNER
    }

    struct Winner {
        address payable addr;
        uint amount;
    }

    LOTTERY_STATE public lotteryState;
    address public owner;
    mapping(bytes32 => address payable) public ticketRequests;
    address payable[] public players;
    uint256[] public tickets;

    uint public lotteryId;
    mapping(uint => Winner) public lotteryHistory;

    // .01 ETH/MATIC
    uint256 public MINIMUM_AMOUNT = 1000000000000000;
    // Upper and Lower bounds for YTD inflation randmoness
    uint256 public INFLATION_UPPER = 13500;
    uint256 public INFLATION_LOWER = 10000;

    // Truflation Index
    address public chainlinkContract =
        0x326C977E6efc84E512bB9C30f76E30c160eD06FB;
    address public oracleId = 0x17dED59fCd940F0a40462D52AAcD11493C6D8073;
    string public jobId = "e5b99e0a2f79402998187b11f37c56a6";
    uint256 public feeTruflation = 10000000000000000; // 0.01 LINK;
    uint256 public yoyInflation;

    // Randomness
    bytes32 internal keyHash =
        0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4;
    uint256 internal feeRandomness = 100000000000000; // 0.0001 LINK

    // Events
    event newPlayerAdded(address player, uint256 ticket);

    constructor()
        VRFConsumerBase(
            0x8C7382F9D8f56b33781fE506E897a4F1e2d17255, // VRF Coordinator
            0x326C977E6efc84E512bB9C30f76E30c160eD06FB // LINK Token
        )
    {
        setChainlinkToken(chainlinkContract);
        lotteryId = 2;
        lotteryState = LOTTERY_STATE.CLOSED;
        owner = msg.sender;
    }

    modifier onlyowner() {
        require(msg.sender == owner);
        _;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getMinimumEntry() public view returns (uint) {
        return MINIMUM_AMOUNT;
    }

    function getLotteryId() public view returns (uint) {
        return lotteryId;
    }

    function getLotteryState() public view returns (LOTTERY_STATE) {
        return lotteryState;
    }

    function getPlayers()
        public
        view
        returns (address payable[] memory, uint[] memory)
    {
        return (players, tickets);
    }

    function getWinnerByLottery(
        uint lottery
    ) public view returns (address, uint) {
        return (lotteryHistory[lottery].addr, lotteryHistory[lottery].amount);
    }

    function getLotteryHistory()
        public
        view
        returns (address[] memory, uint[] memory)
    {
        address[] memory mAddr = new address[](lotteryId);
        uint[] memory mAmount = new uint[](lotteryId);

        for (uint i = 0; i < lotteryId; i++) {
            mAddr[i] = lotteryHistory[i + 1].addr;
            mAmount[i] = lotteryHistory[i + 1].amount;
        }

        return (mAddr, mAmount);
    }

    // If you include the chainlink alarm, this is the alarm setup trigger
    function startNewLottery() public onlyowner {
        require(
            lotteryState == LOTTERY_STATE.CLOSED,
            "can't start a new lottery yet"
        );
        lotteryState = LOTTERY_STATE.OPEN;
    }

    // If you include the chainlink alarm, this is the fullfill action
    function finishCurrentLottery() public onlyowner {
        require(
            lotteryState == LOTTERY_STATE.OPEN,
            "The lottery hasn't even started!"
        );
        lotteryState = LOTTERY_STATE.CALCULATING_WINNER;
        requestInflationWei();
    }

    function enter() public payable {
        require(msg.value >= MINIMUM_AMOUNT, "Min contribution 0.01 MATIC");
        require(
            lotteryState == LOTTERY_STATE.OPEN,
            "The lottery hasn't even started!"
        );

        // generate ramdom number
        bytes32 requestId = getRandomNumber();

        // address of player entering lottery
        ticketRequests[requestId] = payable(msg.sender);
    }

    function enterCallback(bytes32 requestId, uint256 randomNumber) private {
        players.push(payable(ticketRequests[requestId]));
        tickets.push(randomNumber);
        emit newPlayerAdded(ticketRequests[requestId], randomNumber);
    }

    function pickWinner() private {
        require(
            lotteryState == LOTTERY_STATE.CALCULATING_WINNER,
            "You aren't at that stage yet!"
        );
        uint inflationToday = yoyInflation / 1000000000000000; // wei/e'15 = 00000
        int closestTicket = 100000; // a random high number just to start the comparation
        uint winnerIndex;
        for (uint256 index = 0; index < tickets.length; index++) {
            int test = substractAndReturnAbs(
                int(tickets[index]),
                int(inflationToday)
            );
            if (test < closestTicket) {
                closestTicket = test;
                winnerIndex = index;
            }
        }

        payWinner(winnerIndex);
    }

    function payWinner(uint winnerIndex) private {
        require(
            lotteryState == LOTTERY_STATE.CALCULATING_WINNER,
            "You aren't at that stage yet!"
        );

        lotteryHistory[lotteryId].addr = players[winnerIndex];
        lotteryHistory[lotteryId].amount = address(this).balance;
        lotteryId++;

        // pay the winner
        players[winnerIndex].transfer(address(this).balance);

        // reset the state of the contract
        players = new address payable[](0);
        tickets = new uint256[](0);
        lotteryState = LOTTERY_STATE.CLOSED;

        // You could have this run forever
        // start_new_lottery();
        // or with a cron job from a chainlink node would allow you to
        // keep calling "start_new_lottery" as well
    }

    function substractAndReturnAbs(
        int val1,
        int val2
    ) private pure returns (int) {
        int result = val1 - val2;
        return result >= 0 ? result : -1 * result;
    }

    function adjustInflationBounds(
        uint256 upper,
        uint256 lower
    ) public onlyowner {
        INFLATION_UPPER = upper;
        INFLATION_LOWER = lower;
    }

    /**
     * Randomness functions
     */
    function getRandomNumber() public returns (bytes32 requestId) {
        require(
            LINK.balanceOf(address(this)) >= feeRandomness,
            "Not enough LINK - fill contract with faucet"
        );
        return requestRandomness(keyHash, feeRandomness);
    }

    function fulfillRandomness(
        bytes32 requestId,
        uint256 randomness
    ) internal override {
        uint256 randomNumber;
        // randomness % (max - min + 1) + min
        randomNumber =
            (randomness % (INFLATION_UPPER - INFLATION_LOWER + 1)) +
            INFLATION_LOWER;
        enterCallback(requestId, randomNumber);
    }

    /**
     * Truflation Index
     */
    function requestInflationWei() internal returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(
            bytes32(bytes(jobId)),
            address(this),
            this.fulfillInflationWei.selector
        );
        req.add("service", "truflation/current");
        req.add("keypath", "yearOverYearInflation");
        req.add("abi", "uint256");
        req.add("multiplier", "1000000000000000000");
        return sendChainlinkRequestTo(oracleId, req, feeTruflation);
    }

    function fulfillInflationWei(
        bytes32 _requestId,
        bytes memory _inflation
    ) public recordChainlinkFulfillment(_requestId) {
        yoyInflation = toUint256(_inflation);
        pickWinner();
    }

    function toUint256(
        bytes memory _bytes
    ) internal pure returns (uint256 value) {
        assembly {
            value := mload(add(_bytes, 0x20))
        }
    }

    function changeOracle(address _oracle) public onlyowner {
        oracleId = _oracle;
    }

    function changeJobId(string memory _jobId) public onlyowner {
        jobId = _jobId;
    }

    function getChainlinkToken() public view returns (address) {
        return chainlinkTokenAddress();
    }
}
