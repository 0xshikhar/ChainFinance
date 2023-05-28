export default function makeContract(web3, abi, address) {
  const contract = new web3.eth.Contract(abi, address);
  console.log("contract", contract)
  return contract;
}
