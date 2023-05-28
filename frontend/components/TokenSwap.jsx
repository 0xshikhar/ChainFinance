import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import swapABI from '../abis/UnofDexSwap'
import { useAccount, Provider, useProvider, useContract, useSigner } from 'wagmi'
import { erc20ABI } from "wagmi";


const TokenSwap = () => {
    const { address, disconnect, isConnected } = useAccount()
    const provider = useProvider();
    const { data: signer, isError, isLoading } = useSigner();
    const [user, setUser] = useState(null);
    const chainId = 10200;

    // useEffect(() => {
    //     if (window.ethereum) {
    //         const isMetaMaskConnected = async () => {
    //             let provider = new ethers.providers.Web3Provider(window.ethereum);
    //             const accounts = await ethereum.request({ method: "eth_accounts" });
    //             let account = null;
    //             if (accounts.length !== 0) {
    //             } else {
    //                 console.log("No authorized account found");
    //             }
    //             let signer = provider.getSigner(account);
    //             setUser({ provider: provider, signer: signer, account: account });
    //         };
    //         isMetaMaskConnected();
    //         window.ethereum.on("chainChanged", (chainId) => {
    //             if(chainId !== 10200){
    //                 window.location.reload();
    //             }
    //         });
    //         window.ethereum.on("accountsChanged", () => {
    //             window.location.reload();
    //         });
    //     } else {

    //     }
    // }, [address])

    const [tokenInAddress, setTokenInAddress] = useState("");
    const [tokenOutAddress, setTokenOutAddress] = useState("");
    const [tokenInAmount, setTokenInAmount] = useState("");
    const [quote, setQuote] = useState("");
    const [swapAmount, setSwapAmount] = useState("");

    const [tokenBalance, setTokenBalance] = useState("");
    const [balance, setBalance] = useState("");
    const [recipientAddress, setRecipientAddress] = useState("");
    const [amount, setAmount] = useState("");
    const [walletAddress, setWalletAddress] = useState("");


    // const provider = new ethers.providers.JsonRpcProvider(`https://rpc.eu-central-2.gateway.fm/v4/gnosis/archival/chiado?apiKey=${process.env.NEXT_PUBLIC_GATEWAY_GNOSIS_API_KEY}`)
    // console.log("Provider", provider)
    // const signer = provider.getSigner();

    const contractAddress = "0xb106ed7587365a16b6691a3D4B2A734f4E8268a2";

    const dexAddress = "0x085E9a646d5320C9333FD6F366DF6CcF5D84eAe4";


    const handleSwap = async () => {
        try {
            const contract = new ethers.Contract(dexAddress, swapABI.abi, signer);

            const swapAmount = await contract.swapNonNativeToken(
                tokenInAddress,
                tokenOutAddress,
                ethers.utils.parseEther(tokenInAmount)
            );
            setSwapAmount(ethers.utils.formatEther(swapAmount));
        } catch (error) {
            console.error("Swap failed:", error);
        }
    };

    const handleFetchBalance = async () => {
        try {
            // Paste the ABI of the ERC20 token contract here

            const contract = new ethers.Contract(
                contractAddress,
                erc20ABI,
                provider
            );

            const tokenBalanceB = await contract.balanceOf(address);
            const totalSupply = await contract.totalSupply();
            console.log("contract", contract, "address", address, "contractAddress", contractAddress)
            console.log("tokenBalance", tokenBalanceB, "totalSupply", totalSupply);
            setTokenBalance(tokenBalanceB.toString());
        } catch (error) {
            console.error("Error fetching token balance:", error);
        }
    };

    const handleQuote = async () => {
        try {
            const quote = await contract.getQuote(
                tokenInAddress,
                tokenOutAddress,
                ethers.utils.parseEther(tokenInAmount)
            );
            console.log("quote", quote)
            setQuote(ethers.utils.formatEther(quote));
        } catch (error) {
            console.error("Quote retrieval failed:", error);
        }
    };

    const handleSendTokens = async () => {
        try {

            // const wallet = ethers.Wallet.createRandom(); // Generate a new random wallet for signing the transaction
            // const privateKey = wallet.privateKey;
            // const signer = new ethers.Wallet(privateKey, provider);

            const contract = new ethers.Contract(
                contractAddress,
                erc20ABI,
                signer
            );

            const tx = await contract.transfer(recipientAddress, (amount*10**18).toString());
            await tx.wait();

            console.log("Tokens sent successfully!");
        } catch (error) {
            console.error("Error sending tokens:", error);
        }
    };

    return (
        <div className="text-gray-400">
            <button className="bg-blue-500 p-5" onClick={handleFetchBalance}> Check token balance</button>
            <p>Token balance: {tokenBalance}</p>
            <div>
                <h1>Fetch ERC20 Token Balance and Send Tokens</h1>
                <div>
                    <label>Contract Address:</label>
                    <input
                        type="text"
                        value={contractAddress}
                        onChange={(e) => setContractAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label>Wallet Address:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setWalletAddress(e.target.value)}
                    />
                </div>
                <div>
                    <button onClick={handleFetchBalance}>Fetch Balance</button>
                </div>
                {balance && <p>Token Balance: {balance}</p>}
                <hr />
                <div>
                    <label>Recipient Address:</label>
                    <input
                        type="text"
                        value={recipientAddress}
                        onChange={(e) => setRecipientAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div>
                    <button onClick={handleSendTokens}>Send Tokens</button>
                </div>
            </div>



            <h1>Token Swap</h1>
            <div>
                <label>Token In Address:</label>
                <input
                    type="text"
                    value={tokenInAddress}
                    onChange={(e) => setTokenInAddress(e.target.value)}
                />
            </div>
            <div>
                <label>Token Out Address:</label>
                <input
                    type="text"
                    value={tokenOutAddress}
                    onChange={(e) => setTokenOutAddress(e.target.value)}
                />
            </div>
            <div>
                <label>Token In Amount:</label>
                <input
                    type="text"
                    value={tokenInAmount}
                    onChange={(e) => setTokenInAmount(e.target.value)}
                />
            </div>
            <div>
                <button onClick={handleQuote}>Get Quote</button>
            </div>
            {quote && <p>Quote: {quote}</p>}
            <div>
                <button onClick={handleSwap}>Swap</button>
            </div>
            {swapAmount && <p>Swap Amount: {swapAmount}</p>}
        </div>
    );
};

export default TokenSwap;