// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract USDPriceConverter {
    AggregatorV3Interface internal priceFeedEthUSD;
    AggregatorV3Interface internal priceFeedIlvUSD;
    AggregatorV3Interface internal priceFeedBtcUSD;
    AggregatorV3Interface internal priceFeedLinkUSD;
    AggregatorV3Interface internal priceFeedLtcUSD;
    AggregatorV3Interface internal priceFeedRepUSD;
    AggregatorV3Interface internal priceFeedSnxUSD;
    AggregatorV3Interface internal priceFeedXauUSD;
    AggregatorV3Interface internal priceFeedTrxUSD;
    AggregatorV3Interface internal priceFeedXrpUSD;
    AggregatorV3Interface internal priceFeedZrxUSD;
    AggregatorV3Interface internal priceFeedXagUSD;
    AggregatorV3Interface internal priceFeedXtzUSD;

    /**
     * Network: sepolia
     * Aggregator: Eth, Ilv, Btc, Link, Ltc, Rep, Snx, Trx, Xau, Xrp, Zrx, Xag, Xtz / USD
     */
    constructor() {
        priceFeedEthUSD = AggregatorV3Interface(
            0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
        );
        priceFeedIlvUSD = AggregatorV3Interface(
            0x48731cF7e84dc94C5f84577882c14Be11a5B7456
        );
        priceFeedBtcUSD = AggregatorV3Interface(
            0xECe365B379E1dD183B20fc5f022230C044d51404
        );
        priceFeedLinkUSD = AggregatorV3Interface(
            0xd8bD0a1cB028a31AA859A21A3758685a95dE4623
        );
        priceFeedLtcUSD = AggregatorV3Interface(
            0x4d38a35C2D87976F334c2d2379b535F1D461D9B4
        );
        priceFeedRepUSD = AggregatorV3Interface(
            0x9331b55D9830EF609A2aBCfAc0FBCE050A52fdEa
        );
        priceFeedSnxUSD = AggregatorV3Interface(
            0xE96C4407597CD507002dF88ff6E0008AB41266Ee
        );
        priceFeedXauUSD = AggregatorV3Interface(
            0x81570059A0cb83888f1459Ec66Aad1Ac16730243
        );
        priceFeedTrxUSD = AggregatorV3Interface(
            0xb29f616a0d54FF292e997922fFf46012a63E2FAe
        );
        priceFeedXrpUSD = AggregatorV3Interface(
            0xc3E76f41CAbA4aB38F00c7255d4df663DA02A024
        );
        priceFeedZrxUSD = AggregatorV3Interface(
            0xF7Bbe4D7d13d600127B6Aa132f1dCea301e9c8Fc
        );
        priceFeedXagUSD = AggregatorV3Interface(
            0x9c1946428f4f159dB4889aA6B218833f467e1BfD
        );
        priceFeedXtzUSD = AggregatorV3Interface(
            0xf57FCa8B932c43dFe560d3274262b2597BCD2e5A
        );
    }

    /**
     * Returns the latest price
     */
    function getLatestPriceEth() public view returns (int) {
        (, /*uint80 roundID*/ int price, , , ) = /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
        priceFeedEthUSD.latestRoundData();
        return price;
    }

    function getLatestPriceIlv() public view returns (int) {
        (, /*uint80 roundID*/ int price, , , ) = /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
        priceFeedIlvUSD.latestRoundData();
        return price;
    }

    function getLatestPriceBtc() public view returns (int) {
        (, /*uint80 roundID*/ int price, , , ) = /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
        priceFeedBtcUSD.latestRoundData();
        return price;
    }

    function getLatestPriceLink() public view returns (int) {
        (, /*uint80 roundID*/ int price, , , ) = /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
        priceFeedLinkUSD.latestRoundData();
        return price;
    }

    function getLatestPriceLtc() public view returns (int) {
        (, /*uint80 roundID*/ int price, , , ) = /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
        priceFeedLtcUSD.latestRoundData();
        return price;
    }

    function getLatestPriceRep() public view returns (int) {
        (, /*uint80 roundID*/ int price, , , ) = /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
        priceFeedRepUSD.latestRoundData();
        return price;
    }

    function getLatestPriceSnx() public view returns (int) {
        (, /*uint80 roundID*/ int price, , , ) = /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
        priceFeedSnxUSD.latestRoundData();
        return price;
    }

    function getLatestPriceXau() public view returns (int) {
        (, /*uint80 roundID*/ int price, , , ) = /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
        priceFeedXauUSD.latestRoundData();
        return price;
    }

    function getLatestPriceTrx() public view returns (int) {
        (, /*uint80 roundID*/ int price, , , ) = /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
        priceFeedTrxUSD.latestRoundData();
        return price;
    }

    function getLatestPriceXrp() public view returns (int) {
        (, /*uint80 roundID*/ int price, , , ) = /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
        priceFeedXrpUSD.latestRoundData();
        return price;
    }

    function getLatestPriceZrx() public view returns (int) {
        (, /*uint80 roundID*/ int price, , , ) = /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
        priceFeedZrxUSD.latestRoundData();
        return price;
    }

    function getLatestPriceXag() public view returns (int) {
        (, /*uint80 roundID*/ int price, , , ) = /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
        priceFeedXagUSD.latestRoundData();
        return price;
    }

    function getLatestPriceXtz() public view returns (int) {
        (, /*uint80 roundID*/ int price, , , ) = /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
        priceFeedXtzUSD.latestRoundData();
        return price;
    }
}
