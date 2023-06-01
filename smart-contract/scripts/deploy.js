const hre = require("hardhat");

async function main() {
	const Contract = await hre.ethers.getContractFactory("Exchange");
	const Market = await hre.ethers.getContractFactory("PredictionMarket");

	const contract = await Contract.deploy();
	const market = await Market.deploy();

	await contract.deployed();
	await market.deployed();

	console.log("Exchange deployed to:", contract.address);
	console.log("PredictionMarket deployed to:", market.address);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});