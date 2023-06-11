import { polygonMumbai, sepolia, hardhat } from "wagmi/chains";

export const EURE_TOKEN_ADDRESS = {
    [polygonMumbai.id]: "0xcCA6b920eebFf5343cCCf386909Ec2D8Ba802bdd",
    [hardhat.id]: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    [sepolia.id]: "0xcCA6b920eebFf5343cCCf386909Ec2D8Ba802bdd",
};

// const DexConstants = {
//     initializing: "initializing",
//     unavailable: "unavailable",
//     notConnected: "notConnected",
//     connecting: "connecting",
//     connected: "connected",
//     nativeContractAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
//     allowance: "10000000000000000000000",
//     hyperspaceChainId: "3141"
// };

// export default DexConstants;
