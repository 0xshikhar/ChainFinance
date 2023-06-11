import { useEffect, useState } from 'react';
import {
    MoneriumClient, Chain,
    Network,
    PaymentStandard,
    OrderKind,
    Currency
} from '@monerium/sdk';
import { useAccount, useSignMessage, useNetwork, useBalance } from 'wagmi';
import { EURE_TOKEN_ADDRESS } from "../constants";
import { ethers, BigNumber } from "ethers";
import cx from "classnames";

const BalanceBanner = ({ maticBalance, usdeBalance }) => {
    console.log("maticBalance", maticBalance);
    console.log("usdeBalance", usdeBalance);
    return (
        <div className="bg-blue-100 rounded-xl  px-4 py-4 flex flex-col justify-center gap-4 mb-4">
            <div>
                Matic Balance:  {Number(ethers.utils.formatEther(maticBalance)).toPrecision(4)}
            </div>
            <div>
                USDe Balance:  {ethers.utils.formatEther(usdeBalance)}
            </div>
            <div>
                ETH Balance:  0.0
            </div>
        </div>
    );
};


const IbanBanner = () => {

    return (
        <div className={cx("bg-yellow-100 rounded-lg px-4 align-center py-4 gap-4 flex flex-col items-center")}>
            <div className='align-middle justify-center'>
                <div className="text-center">
                    Create an IBAN to obtain crypto by sending a bank transfer.

                </div>

                <a href="https://sandbox.monerium.dev/accounts/">
                    <button className="text-black w-full bg-[#027DFC] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Create IBAN
                    </button>
                </a>
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

    const { chain } = useNetwork();
    const { address } = useAccount();
    const { signMessageAsync } = useSignMessage();

    const [amount, setAmount] = useState("1");
    const [iban, setIban] = useState("IS39 4980 5411 0230 0201 4720 37");

    const options = {};

    const { data: usdeBalance } = useBalance({ token: EURE_TOKEN_ADDRESS[chain?.id ?? 137], address });
    const { data: maticBalance } = useBalance({ address });



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

    const sendMoney = async (event) => {
        event.preventDefault();

        if (!client) return;

        const message = `Transfering EURO ${amount} to your account (${iban}) at ${new Date().toISOString()}`;
        const signature = await signMessageAsync({ message });
        console.log("message", message, "signature", signature);

        try {
            const order = await client.placeOrder({
                chain: "polygon",
                network: "mumbai",
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
                    <div className='bg-[#affc41] rounded-2xl '>
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
                                        <BalanceBanner
                                            maticBalance={maticBalance?.value || BigNumber.from(0)}
                                            usdeBalance={usdeBalance?.value || BigNumber.from(0)}
                                        />
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
                                                    <option value="usde">USDe</option>
                                                    <option value="xdai">Matic</option>
                                                    <option value="ether">ETH</option>
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
                                            <input type="text" onChange={(event) => { setAmount(event.target.value) }} id="input-amount" className="shadow-sm bg-gray-800 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="0 usde" required />
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