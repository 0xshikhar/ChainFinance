# ChainFinance Platform 


## 😃 Intro

 ChainFinance is a finance platform built for the ChainLink Hackathon which provides wide range of services and features for any defi users. It is a platform where users can swap, stake, predict markets, and do bank payment on their crypto assets. 

## 📝 Contracts
Contracts are deloyed on Polygon Mumbai Testnet.

**Market**
Exchange contract: 0x8bE7560eEb4fF64aB2914ffa573A38f003d9E739
PredictionMarket contract: 0xAA8De56927542E7Af85AE3F68Fb69594E7cF8613
Trufation Data fetcher - 0x97a0B606338e0aD0020ad8b9d83DB2A7cA3c9bc2
Truflation Tester - 0x435a4e2f629Be050514eAE83947d04969621C681

**Lottery**
ChainFinance Lottey - 0x5F63126042Cd2Afe476b59535E0a6D4e7a8b1C33u 
Chainlink VRF contract - 0xC553f7EE2223C7aaAc20a3545D633EEe3bea4c95

# 📚 Main Features

## 📈 Prediction Market

The most innovative feature of the Chain Finance Platform is the prediction market. Users can predict the price of any crypto asset and earn rewards based on their prediction. The main inspiration was seeing people taking bets with each other on twitter, with regards to future prices of tokens & assets. The most recent example of this is the bet of 1 Million Dollar by Balaji Srinivasan on the price of Bitcoin.
To do this, they needed to trust a human to escrow the money. This is pretty embarrasing for the crypto industry, as making bets against each other in an autonomous peer-to-peer way was one of the absolute first use-cases that were brought up years ago. Because of this, it was obvious to me that an exchange were people can make bets such as the one above, WITHOUT a single trusted party that decides the outcome, was necessary.

They are two type of Prediction Markets on ChainFinance
### 1. Token Prediction Market
![Prediction Market](./images/gnof-3.png)

As a user you can create a market or buy a side of market that someone else has created. Three example scenarios are:

You are bullish/bearish an asset and thinks it going to be over/under a certain price at a certain date.
You are bearish a stablecoin and think that it will depeg.
You are market neutral and wanna create a market and sell BOTH sides of it
We take example 1 above, and create a market that resolves on Christmas (25 Dec) 
Strike Price: $2000 (the price ETH needs to hit for you to win)
Expiry: 2022-09-16 (the end date)
Position Size: 1000 MATIC (the payout)
Underlying collateral for a market is always in the native token. We are on Polygon PoS, so that is MATIC.
Over Odds: 10.00 which is the same as 10% (your side)
The price is currently ~$1500 for $ETH, so a 10% chance of it reaching $2000 in ~1 month might be reasonable
Under Odds: 1.111... which is the same as 90% (your opponent's side)
NOTE: Over Odds + Under Odds = 100% always because the smart contract currently take 0 fees.

You create the market, and what happens in the background is:

From your input, the web client will generate a SVG and pin it on IPFS. (https://github.com/0xshikhar/ChainFinance/blob/main/frontend/utils/ipfs.ts)
Two ERC721 tokens gets created, one representing the UNDER SIDE, and one representing the OVER SIDE. Here is how the OVER SIDE looks on OpenSea 
Since you chose the OVER SIDE when creating the market, the UNDER SIDE will automatically get listed on the p2ppredict exchange. You can also list on OpenSea as well, if you want to.
Under Price = Position Size / Under Odds = 1000 / 1.111... = 900 MATIC Which means that the UNDER SIDE is now listed for 900 MATIC on the exchange. Someone buys the UNDER SIDE for 900 MATIC which means that you'll receive 900 MATIC, making the input for your bet:

Your stake = Position Size - List Price = 1000 MATIC - 900 MATIC = 100 MATIC

And your opponents stake is of course 900 MATIC (what they payed for the UNDER SIDE). This table explains what will happen on September 16th (the day after the Merge):

ETH Price	Winner	Payout
$ETH is above $2000 ->	You	100 MATIC * 10.00 = 1000 MATIC
$ETH is below $2000 ->	Not You	900 MATIC * 1.111... = 1000 MATIC
So to summarize, if you win you'll get 1000 MATIC and your stake is only 100 MATIC, which makes sense since 100 * 10.00 = 1000 and your odds was 10.00! When the expiry date is here, you just go the page that's showing you your open positions and click exercise. That will trigger a function in the prediction market contract, and that function will:

1. Check that we are at expiry
2. Query the chainlink price feed contract for ETH/USD and determine if the UNDER or OVER side won
3. Pay the winner

And that's is how a market works on ChainFinance from creation to being exercised!


### 2. Commodity & Index Prediction Market

![Prediction Market](./images/gnof-1.png)

The Commodity & Index Prediction Market is similar to the Token Prediction Market. The only difference is that the underlying asset is not a token but a commodity or an index. The user can create a market or buy a side of market that someone else has created. 

The underlying differce is that the price of Commodity/Index is fetched from custom smart contract implementing Truflation using Chainlink Keeper which is deployed on Polygon Mumbai Testnet. The smart contract is fetching the price of Commodity/Index from Chainlink Oracle. And we can bet on real market price in completely decentralized way.

## 📊 Lottery

It's a lottery that generates random tickets in a known range using ChainlinkVRF. At the end of each week the smart contract will make select the closest ticket to the last 2 digit of the number of Contracts deployed on Ethereum Mainnet by that time of that day and pay the owner of that ticket. All of this can be possible due to complex decentralized quering provided by Space & Time. 
Then user will recieve a Dynamic NFT which will mention that closest number of Contract(last 2 digit) on Ethereum Mainnet at that time.

 By combining the elements of prediction markets and lottery mechanics, Chain Finance offers a unique and thrilling experience for its users of decentralized dynamic NFT.

 ## 🏛️ Bank Payment

---

First of all, Lets discuss about the most innovative feature of ChainFinance where users can transfer any crypto from their crypto wallet (like Metamask wallet) to any bank account in form of EURO. The DEX supports various tokens, allowing users to swap cryptocurrencies and even traditional fiat currencies in EURO through bank transfers to a user bank account or any other person's bank account using Monerium. Chain Finance aims to provide a user-friendly and accessible platform, empowering individuals to manage their digital assets efficiently.


### Send Crypto to your Bank Account

![Send Self Bank Transfer](./images/gnof-account.png)

User can send crypto to their own bank account just by entering their IBAN number.

### Send Crypto Payment to Any Bank Account

![Send Normal Payment](./images/gnof-4.png)

User can send crypto to any bank account in form of EURO and reciever will get it like normal bank payment.
User can also enter the reason for payment like "Salary", "Rent", "Gift" etc. User need to enter Reciever bank details like IBAN, Reciever Name etc for sending payment. 


## 💱 DEX

---

One of the another features of ChainFinance is its DEX where users can swap one token for another which is built using Uniswap V3.
By Default, user can swap **VERSE token** to LINK token in Ethereum Mainnet.

![GNOFdex](./images/gnof-1.png)

## What we learned
Everything that's necessary for a market to exist for ANY arbitrary asset. Apart from it, i got to know about Truflation Realtime data integration in a completely decentralized way and how to use Chainlink Keeper for it. 
I deep dive into lots of things and explored lot about DeFi - 
- Chainlink Oracles & Chainlink VRF 
- How actually prediction market works in Centralized & Decentralized way
- Use of Space & Time for creation of dynamic NFT for complex lottery
- Chainlink Functions & Data Feeds Integration of Verse token Truflation API for Prediction Market's commodities data 

This is pretty cool, because what it means is that we will probably see more and more derivatives in DeFi. 

---

## 📝 Tech Stack

### Smart Contracts/Backend
- Solidity
- Hardhat
- Ethers.js
- Chainlink Keeper, Chainlink VRF, Chainlink DataFeeds & ChainLink Functions
- Space & Time for complex quering for Lottery
- Polygon (Matic) Network
- IPFS
- Truflation for real time data of commodities & index

### Frontend
- React.js
- Next.js
- Tailwind CSS

## What's Next?
- Keep working on the UI and the general UX of the website
- Optimize the contracts to consume less gas.
- Get support for more markets.
- Make it possible to have whatever ERC20-token you want as collateral for a position, not just the native token.
- Change the predictions from being ERC721s to ERC1155s, so that every position can have multiple shares.
- Add Support for more real time assets like Stocks, Commodities, Index etc.
- Mainnet Launch 

## Thank you!
**Developed with ❤️ by 0xShikhar**