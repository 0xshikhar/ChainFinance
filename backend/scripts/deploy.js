const hre = require("hardhat");

async function main() {
	const Contract = await hre.ethers.getContractFactory("UnofDexSwap");
	const contract = await Contract.deploy("0x66579bd8E6B7c30F1F65E9eCf1404147284EC7B8","0x4E1cbE750BD21466F9C552F1237E401ebf3c43eC");

	await contract.deployed();

	console.log("UnofDexSwap:", contract.address);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});