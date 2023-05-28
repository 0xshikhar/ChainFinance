require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config()

module.exports = {
	solidity: {
		version: "0.8.18",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
				details: {
					yul: true,
				}
			},
			viaIR: true,
		}
	},
	allowUnlimitedContractSize: true,
	networks: {
		hardhat: {},
		goerli: {
			accounts: [`${process.env.PRIVATE_KEY}`],
			url: `https://rpc.eu-north-1.gateway.fm/v4/ethereum/non-archival/goerli?apiKey=${process.env.GATEWAY_ETHEREUM_API_KEY}`,
			allowUnlimitedContractSize: true,
		},
		gnosis: {
			url: `https://rpc.eu-central-2.gateway.fm/v4/gnosis/archival/chiado?apiKey=${process.env.GATEWAY_GNOSIS_API_KEY}`,
			accounts: [`${process.env.PRIVATE_KEY}`],
			allowUnlimitedContractSize: true,
		},
		chiado: {
			url: `https://rpc.eu-central-2.gateway.fm/v4/gnosis/archival/chiado?apiKey=${process.env.GATEWAY_GNOSIS_API_KEY}`,
			accounts: [`${process.env.PRIVATE_KEY}`],
			gasPrice: 1000000000,
			allowUnlimitedContractSize: true,
		},

	},
	etherscan: {
		apiKey: `${process.env.ETHERSCAN_API_KEY}`
	}
}