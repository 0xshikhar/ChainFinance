import React, { useEffect, useState } from 'react';
import {
    MoneriumClient, Chain,
    Network,
    PaymentStandard,
    OrderKind,
    Currency
} from '@monerium/sdk';
import { useAccount, useSignMessage } from 'wagmi';
import { set } from 'react-hook-form';

// const client = new MoneriumClient("sandbox");

const BankTransfer = () => {
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
                console.log("client", moneriumClient);
                console.log("clientAuth", clientAuth);

                const authContext = await moneriumClient.getAuthContext();
                console.log("authContext", authContext);

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

    const getIban = async () => {
        if (!client) return;

        const context = await client.getAuthContext();
        const profileId = context.profiles[0].id;
        const profile = await client.getProfile(profileId);

        const account = profile.accounts.find(
            (account) =>
                account.chain === Chain.gnosis &&
                account.standard === PaymentStandard.iban &&
                account.network === Network.chiado
        );

        return account?.iban;
    };

    const getOpenId = async () => {
        if (!client) return;
        try {
            let authFlowUrl = this.client.getAuthFlowURI({
                client_id: process.env.NEXT_PUBLIC_MONERIUM_CLIENT_ID || "",
                redirect_uri: MONERIUM_REDIRECT_URL,
                // immediately connect a wallet by adding these optional parameters:
                // TODO: get address from options
                // address: options.walletAddress,
                // signature:
                // "0xVALID_SIGNATURE_2c23962f5a2f189b777b6ecc19a395f446c86aaf3b5d1dc0ba919ddb34372f4c9f0c8686cfc2e8266b3e4d8d1bc7bc67c34a11f9dfe8e691b",
                chain: Chain.gnosis,
                network: Network.chiado,
                state: options.walletAddress,
            });

            const href = new URL(authFlowUrl);
            href.searchParams.set("code_challenge", CODE_CHALLENGE);

            window.location.href = href.toString();
        } catch {
            console.log("Error trying to create a new Monerium session");
        }

    }

    const getRefreshToken = (address) => {
        return localStorage.getItem(`monerium-refresh-token-${address}`);
    };

    const saveRefreshToken = (address) => {
        if (!client) return;

        localStorage.setItem(
            `monerium-refresh-token-${address}`,
            client.bearerProfile?.refresh_token || ""
        );
    };

    const sendMoney = async () => {
        if (!client) return;

        const message = `Send EUR ${amount} to ${iban} at ${new Date().toISOString()}`;
        const signature = await signMessageAsync({ message });
        console.log("message", message, "signature", signature);

        try {
            const order = await client.placeOrder({
                chain: "gnosis",
                network: "chiado",
                message: message,
                signature: signature,
                address: address,
                amount: "1",
                kind: OrderKind.redeem,
                memo: "",
                currency: Currency.eur,
                counterpart: {
                    details: {
                        firstName: "Test User",
                        lastName: "User",
                    },
                    identifier: {
                        standard: PaymentStandard.iban,
                        iban: "IS39 4980 5411 0230 0201 4720 37",
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
            <div>
                <div id='header'>
                    <div className='pt-4 px-4'>
                        <button className='bg-white p-4' onClick={sendMoney}>Send 1 token</button>
                    </div>

                </div>
                <div className='flex align-middle justify-center rounded'>
                    <div className='bg-[#affc41] rounded-2xl'>
                        <div className='pt-4 px-4 rounded'>
                            <h1 className="text-4xl text-black py-4  font-sans">
                                Send Crypto
                            </h1>
                            <h2 className="text-base text-black py-2 pb-10 font-sans "> To Your Bank Account</h2>
                        </div>

                        <div className='bg-white text-black rounded-[16px] object-contain w-[500px] h-[400px] relative'>
                            <div className="flex h-full items-center justify-center px-4 inset-x-0 bottom-0">
                                <div className="w-full">
                                    {/* <IbanBanner /> */}
                                    <form>
                                        <div className="sm:col-span-3 mt-4">
                                            <label htmlFor="tokens" className="block mb-2 text font-medium text-gray-900">Select Your Token</label>

                                            <div className="mt-2">
                                                <select
                                                    id="token"
                                                    name="token"
                                                    className="block w-full rounded-md border-0 py-2.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                >
                                                    <option>EURe</option>
                                                    <option>xDAI</option>
                                                    <option>Ether</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="my-4">
                                            <label htmlFor="text"
                                                className="block mb-2 text font-medium text-gray-900">Enter Your IBAN</label>
                                            <input type="text" id="input-recepient" onChange={(event) => { setIban(event.target.value) }} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="IS39 4980 5411 0230 0201 4720 37" required />
                                        </div>
                                        <div >
                                            <label htmlFor="tokens" className="block mb-2 text font-medium text-gray-900">Enter Amount</label>
                                            <input type="number" onChange={(event) => { setAmount(event.target.value) }} id="input-amount" className="shadow-sm bg-gray-100 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="0 ETH" required />
                                        </div>
                                        <p className="mb-4 m-1 text-sm">Token will be transferred as Euro on your Bank Account</p>


                                        {/* <div className="flex items-start mb-6">
                                    <div className="flex items-center h-5">
                                        <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                    </div>
                                    <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Verifying <a className="text-blue-600 hover:underline dark:text-blue-500">Transaction</a></label>
                                </div> */}
                                        <button type="submit" onClick={sendMoney}
                                            className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send Money</button>
                                    </form>
                                    {/* <form className="flex flex-col gap-2 mt-4 w-full" onSubmit={onSubmit}>

                                        <div className='text-white'>
                                            <label className="text-black font-bold">Select token</label>
                                            <select {...register("token")}>
                                                <option value="eure">EURe</option>
                                                <option value="xdai">xDAI</option>
                                                <option value="ether">Ether</option>
                                            </select>
                                        </div>
                                        <Input
                                            className="flex-1"
                                            label="Enter your IBAN"
                                            {...register("iban", { required: "IBAN is required" })}
                                            error={errors.iban?.message}
                                        />
                                        <Input
                                            type="number"
                                            className="flex-1"
                                            label="Amount"
                                            error={
                                                errors.amount?.type === "max"
                                                    ? "Amount exceeds balance"
                                                    : errors.amount?.message
                                            }
                                            {...register("amount", {
                                                required: "Amount is required",
                                                max: ethers.utils.formatEther(eureBalance?.value || 0),
                                            })}
                                        />
                                        <Button
                                            type="submit"
                                            className="mt-2"
                                            disabled={isSubmitting}
                                            loading={isSubmitting}
                                        >
                                            Send
                                        </Button>
                                    </form> */}

                                    {/* <div>
                                    <div className='px-6 text-center'>
                                        <input type="String" placeholder="Enter Verification Code" className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className='py-2 items-center justify-center text-center'>
                                        <label htmlFor="my-modal-6" className="btn" >Verify</label>
                                    </div>
                                </div> */}

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div >

        </div >

    )
}

export default BankTransfer;