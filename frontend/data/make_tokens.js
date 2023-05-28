// import erc20ABI from "../abis/ERC20.json";
// import gerc20Abi from "../abis/GERC20ABI";

// import makeTokenContract from "../contracts/TokenContract";

// import gusdLogo from "../assets/fusd_logo.svg";
// import gDexLogo from "../assets/fDex_logo.svg";
// import gDaiLogo from "../assets/fDAI_logo.svg";
// import erc20Logo from '../assets/erc20.png';

// import DexConstants from "../Constants";

// const gUsdAddress = "0xcFC0c8b2F01B655598587F0e48beb931616dCa26";
// // const fDexAddress = "0x4cC33BD5d61791aC58a43A4f645256E7cc75ED1c";
// const GDaiAddress = "0x227d00745cCB118Db8fAfaea118747f8a985A679";
// const EUReAddress = "0xb106ed7587365a16b6691a3D4B2A734f4E8268a2";
// const GNOFAddress = "0x5a9486D42644Ddc3550289C6B7e60b8a55A45db5"

// const wGDaiAddress = "0x4E1cbE750BD21466F9C552F1237E401ebf3c43eC";

// // gnosis staking token
// const tGNO = "0x5a9486D42644Ddc3550289C6B7e60b8a55A45db5"



// export default function makeTokens(web3) {
//   return Object.freeze({
//     gUsd: makeTokenContract(web3, erc20ABI.abi, gUsdAddress, {
//       name: "gUSD",
//       logo: gusdLogo,
//     }),
//     gDai: makeTokenContract(web3, erc20ABI.abi, GDaiAddress, {
//       name: "GDAI",
//       logo: gDaiLogo,
//     }),
//     gDex: makeTokenContract(web3, erc20ABI.abi, GNOFAddress, {
//       name: "GNOF",
//       logo: gDexLogo,
//     }),
//     wgDai: makeTokenContract(web3, gerc20Abi.abi, gerc20Abi.wtFilAddress, {
//       name: "WTFIL",
//       logo: gDexLogo,
//     }),
//     tGNO: makeTokenContract(
//       web3,
//       gerc20Abi.abi,
//       "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
//       {
//         name: "xDAI",
//         logo: GDaiLogo,
//       }
//     ),
//   });
// }
