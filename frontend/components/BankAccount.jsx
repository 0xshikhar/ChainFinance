import React, { useEffect, useState } from 'react';
import {
    MoneriumClient, Chain,
    Network,
    PaymentStandard,
    OrderKind,
    Currency
} from '@monerium/sdk';
import { useAccount, useSignMessage, useNetwork, useBalance } from 'wagmi';
import { set } from 'react-hook-form';
import { EURE_TOKEN_ADDRESS } from "../constants";
import { TokenBalance } from './TokenBalance';
import { CopyButton } from './CopyButton';
// import { Input } from "../components/basic/input";
import { Button } from "./basic/button";
import cx from "classnames";

// const client = new MoneriumClient("sandbox");
const IbanBanner = () => {

    return (
        <div className={cx("bg-yellow-100 rounded-lg px-4 align-center py-4 gap-4 flex flex-col items-center")}>
            <div className='align-middle justify-center'>
                <div className="text-center">
                    Create an IBAN to obtain crypto by sending a bank transfer.
                    IBAN.
                </div>

                <button className="text-black w-full bg-[#027DFC] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Create IBAN
                    </button>
            </div>
            <div>
                <div>Get crypto by sending a bank transfer to this IBAN</div>
                <div className="text-center mt-2">
                    <div className="flex gap-2 items-center">
                        {/* <CopyButton
                            text={iban}
                            label="Copy"
                            size="xs"
                            variant="outline"
                        /> */}
                    </div>
                </div>
                <a
                    href="https://sandbox.monerium.dev/mockbank"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2"
                >
                    <button className="text-black w-full bg-[#027DFC] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Send bank transfer
                    </button>
                </a>
            </div>
        </div>
    )
}

const BankAccount = () => {
    // const client = new MoneriumClient("sandbox");
    const [client, setClient] = useState(null);

    const { address } = useAccount();
    const { signMessageAsync } = useSignMessage();

    const [amount, setAmount] = useState("1");
    const [iban, setIban] = useState("IS39 4980 5411 0230 0201 4720 37");

    const options = {};



    useEffect(() => {
        const initializeClient = async () => {
            const moneriumClient = new MoneriumClient("sandbox");

            try {
                const clientAuth = await moneriumClient.auth({
                    client_id: process.env.NEXT_PUBLIC_MONERIUM_CLIENT_ID,
                    client_secret: process.env.NEXT_PUBLIC_MONERIUM_CLIENT_SECRET,
                });
                setClient(moneriumClient);

                const authContext = await moneriumClient.getAuthContext();

                // const savedRefreshToken = getRefreshToken(address || "");

                // if (savedRefreshToken) {
                //     await moneriumClient.auth({
                //         client_id: MONERIUM_CLIENT_ID,
                //         refresh_token: savedRefreshToken,
                //     });

                //     setIban(await getIban());

                //     saveRefreshToken(address || "");
                // }
            } catch (error) {
                console.log("clientAuth error", error);
            }
        };

        initializeClient();
    }, []);

    // const getIban = async () => {
    //     if (!client) return;

    //     const context = await client.getAuthContext();
    //     const profileId = context.profiles[0].id;
    //     const profile = await client.getProfile(profileId);

    //     const account = profile.accounts.find(
    //         (account) =>
    //             account.chain === Chain.gnosis &&
    //             account.standard === PaymentStandard.iban &&
    //             account.network === Network.chiado
    //     );

    //     return account?.iban;
    // };

    // const getOpenId = async () => {
    //     if (!client) return;
    //     try {
    //         let authFlowUrl = this.client.getAuthFlowURI({
    //             client_id: process.env.NEXT_PUBLIC_MONERIUM_CLIENT_ID || "",
    //             redirect_uri: MONERIUM_REDIRECT_URL,
    //             // immediately connect a wallet by adding these optional parameters:
    //             // TODO: get address from options
    //             // address: options.walletAddress,
    //             // signature:
    //             // "0xVALID_SIGNATURE_2c23962f5a2f189b777b6ecc19a395f446c86aaf3b5d1dc0ba919ddb34372f4c9f0c8686cfc2e8266b3e4d8d1bc7bc67c34a11f9dfe8e691b",
    //             chain: Chain.gnosis,
    //             network: Network.chiado,
    //             state: options.walletAddress,
    //         });

    //         const href = new URL(authFlowUrl);
    //         href.searchParams.set("code_challenge", CODE_CHALLENGE);

    //         window.location.href = href.toString();
    //     } catch {
    //         console.log("Error trying to create a new Monerium session");
    //     }

    // }

    // const getRefreshToken = (address) => {
    //     return localStorage.getItem(`monerium-refresh-token-${address}`);
    // };

    // const saveRefreshToken = (address) => {
    //     if (!client) return;

    //     localStorage.setItem(
    //         `monerium-refresh-token-${address}`,
    //         client.bearerProfile?.refresh_token || ""
    //     );
    // };

    const sendMoney = async (event) => {
        event.preventDefault();

        if (!client) return;

        const message = `Transfering EURO ${amount} to your account (${iban}) at ${new Date().toISOString()}`;
        const signature = await signMessageAsync({ message });
        console.log("message", message, "signature", signature);

        try {
            const order = await client.placeOrder({
                chain: "gnosis",
                network: "chiado",
                message: message,
                signature: signature,
                address: address,
                amount: amount,
                kind: OrderKind.redeem,
                memo: "transfer to own bank account",
                currency: Currency.eur,
                counterpart: {
                    details: {
                        firstName: "Test",
                        lastName: "User",
                    },
                    identifier: {
                        standard: PaymentStandard.iban,
                        iban: iban,
                    },
                },
            });

            console.log("Order: ", order);
        } catch (error) {
            console.log("order error", error);
        }
    };

    return (
        <div>
            <div className='flex justify-center align-center '>
                <div className='flex mt-8 mx-12 pr-5 align-middle justify-center rounded'>
                    <div className='bg-[#affc41] rounded-2xl'>
                        <div className='pt-4 px-4 rounded'>
                            <h1 className="text-4xl text-black pt-4 ">
                                Your Account
                            </h1>
                            <h2 className="text-base text-black py-2 pb-10 font-sans "> Fund Your Wallet Now</h2>
                        </div>

                        <div className='bg-white text-black rounded-[16px] object-contain w-[400px] h-[440px] relative'>
                            <div className="flex h-full items-center justify-center px-4 inset-x-0 bottom-0">
                                <div className="w-full px-5">
                                    {/*  */}
                                    <div>
                                        <div className='text-lg'>Token Balance</div>
                                        <TokenBalance />
                                    </div>
                                    <div className='py-2'>
                                    <IbanBanner />

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='flex mt-8 mx-12 pl-5 align-middle justify-center rounded'>
                    <div className='bg-[#affc41] rounded-2xl'>
                        <div className='pt-4 px-4 rounded'>
                            <h1 className="text-4xl text-black pt-4">
                                Send Crypto
                            </h1>
                            <h2 className="text-base text-black py-2 pb-10 font-sans "> To Your Bank Account</h2>
                        </div>

                        <div className='bg-white text-black rounded-[16px] object-contain w-[400px] h-[440px] relative'>
                            <div className="flex h-full items-center justify-center px-4 inset-x-0 bottom-0">
                                <div className="w-full px-5">
                                    {/* <IbanBanner /> */}
                                    <form>
                                        <div className="sm:col-span-3 mt-4">
                                            <label htmlFor="tokens" className="block mb-2 text font-medium text-gray-900">Select Your Token</label>

                                            <div className="mt-2">
                                                <select
                                                    id="token"
                                                    name="token"
                                                    className=" w-full  bg-gray-800 border border-gray-300 text-sm rounded-lg px-2 py-2.5 text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                >
                                                    <option value="eure">EURe</option>
                                                    <option value="xdai">xDAI</option>
                                                    <option value="ether">Ether</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="my-4">
                                            <label htmlFor="text"
                                                className="block mb-2 text font-medium text-gray-900">Enter Your IBAN</label>
                                            <input type="text" id="input-recepient" onChange={(event) => { setIban(event.target.value) }} className="shadow-sm bg-gray-800 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="IS39 4980 5411 0230 0201 4720 37" required />
                                        </div>
                                        <div >
                                            <label htmlFor="tokens" className="block mb-2 text font-medium text-gray-900">Enter Amount</label>
                                            <input type="text" onChange={(event) => { setAmount(event.target.value) }} id="input-amount" className="shadow-sm bg-gray-800 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="0 EURe" required />
                                        </div>
                                        <div className="mb-4 m-1 text-sm">Token will be transferred as Euro on your Bank Account</div>

                                        <button type="submit" onClick={sendMoney}
                                            className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send Money
                                        </button>
                                    </form>


                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div >

        </div >

    )
}

export default BankAccount;