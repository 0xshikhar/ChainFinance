require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config()

module.exports = {
	solidity: {
		version: "0.8.13",
		settings: {
			optimizer: {
				enabled: true
			}
		}
	},
	allowUnlimitedContractSize: true,
	networks: {
		hardhat: {},
		mainnet: {
			accounts: [`${process.env.PRIVATE_KEY}`],
			url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
		},
		goerli: {
			accounts: [`${process.env.PRIVATE_KEY}`],
			url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
		},
		sepolia: {
			accounts: [`${process.env.PRIVATE_KEY}`],
			url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
		},
		mumbai: {
			accounts: [`${process.env.PRIVATE_KEY}`],
			url: "https://polygon-mumbai.g.alchemy.com/v2/vG6GH-5Gha7RcZ6hKud-oyraJ8aTyUxB",
			
		},
	},
	etherscan: {
		apiKey: `${process.env.ETHERSCAN_API_KEY}`
	}
}