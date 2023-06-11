import React, { useEffect, useState } from 'react';
import {
    MoneriumClient, Chain,
    Network,
    PaymentStandard,
    OrderKind,
    Currency
} from '@monerium/sdk';
import { useAccount, useSignMessage, useNetwork, useBalance } from 'wagmi';
// import { Button } from "./basic/button";
import cx from "classnames";

// const client = new MoneriumClient("sandbox");
const IbanBanner = () => {

    return (
        <div className={cx("bg-secondary/20 px-4 py-4 gap-4 flex flex-col items-center")}>
            <div>
                <div>Get crypto by sending a bank transfer to this IBAN</div>
                <div className="text-center mt-2">
                    <div className="flex gap-2 items-center">
                        <span className="font-bold text-xl">iban</span>
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
                    <Button>Send bank transfer</Button>
                </a>
            </div>
            <div className="text-center">
                Create an IBAN to simplify your experience on Gumrua. As a buyer,
                you can obtain crypto by simply sending a bank transfer to this
                IBAN.
            </div>
            <a href="https://sandbox.monerium.dev/accounts/6e71b029-fac7-11ed-9fe1-1e82d6c6448a">
                <Button >Create IBAN</Button>
            </a>
        </div>
    )
}

const BankPay = () => {
    // const client = new MoneriumClient("sandbox");
    const [client, setClient] = useState(null);

    const { address } = useAccount();
    const { signMessageAsync } = useSignMessage();

    const [amount, setAmount] = useState("1");
    const [iban, setIban] = useState("IS39 4980 5411 0230 0201 4720 37");

    // create state variable for firstname , lastname, memo, usermessage
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [memo, setMemo] = useState("");
    const [usermessage, setUsermessage] = useState("");

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
            } catch (error) {
                console.log("clientAuth error", error);
            }
        };

        initializeClient();
    }, []);

    const sendMoney = async (event) => {
        event.preventDefault();

        if (!client) return;

        const message = usermessage;
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
                        firstName: firstname,
                        lastName: lastname,
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

                <div className='flex mt-8 mx-2 pl-5 align-middle justify-center rounded'>
                    <div className='bg-[#affc41] rounded-2xl w-[800]'>
                        <div className='pt-4 px-4 rounded'>
                            <h1 className="text-4xl text-black pt-4">
                                Send Crypto To Any Bank Account
                            </h1>
                            <h2 className="text-base text-black py-2 pb-10 font-sans "> Pay Directly In Crypto For Rent, Shop, Payments etc.</h2>
                        </div>

                        <div className='bg-white text-black rounded-[16px] pb-4 first-line:object-contain w-[800px] h-[450px]'>
                            <div className="flex h-full items-center justify-center px-4 inset-x-0 bottom-0">
                                <div className="w-full px-5">
                                    {/* <IbanBanner /> */}
                                    <form className='w-[800]'>
                                        <div className='flex align-middle justify-center pb-5'>
                                            <div className='px-2 w-[400px]'>
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
                                                <div className="my-2">
                                                    <label htmlFor="text"
                                                        className="block mb-2 text font-medium text-gray-900"> First Name</label>
                                                    <input type="text" id="input-recepient" onChange={(event) => { setFirstname(event.target.value) }}
                                                        className="shadow-sm bg-gray-800 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Mark" required />
                                                </div>
                                                <div className="my-2">
                                                    <label htmlFor="text"
                                                        className="block mb-2 text font-medium text-gray-900"> Last Name</label>
                                                    <input type="text" id="input-recepient" onChange={(event) => { setLastname(event.target.value) }} className="shadow-sm bg-gray-800 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Newton" required />
                                                </div>

                                                <div className="my-2">
                                                    <label htmlFor="text"
                                                        className="block mb-2 text font-medium text-gray-900">Enter Your IBAN</label>
                                                    <input type="text" id="input-recepient" onChange={(event) => { setIban(event.target.value) }} className="shadow-sm bg-gray-800 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="IS39 4980 5411 0230 0201 4720 37" required />
                                                </div>

                                            </div>
                                            <div className='px-2  w-[400px]'>
                                                <div className="my-2">
                                                    <label htmlFor="text"
                                                        className="block mb-2 text font-medium text-gray-900">  SignIn Message </label>
                                                    <input type="text" id="input-recepient" onChange={(event) => { setUsermessage(event.target.value) }} className="shadow-sm bg-gray-800 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter any message for authenciation" required />
                                                </div>
                                                <div >
                                                    <label htmlFor="tokens" className="block mb-2 text font-medium text-gray-900">Enter Amount</label>
                                                    <input type="text" onChange={(event) => { setAmount(event.target.value) }} id="input-amount" className="shadow-sm bg-gray-800 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="0 EURe" required />
                                                </div>

                                                <div className="my-2">
                                                    <label htmlFor="text"
                                                        className="block mb-2 text font-medium text-gray-900"> Memo</label>
                                                    <input type="text" id="input-recepient" onChange={(event) => { setMemo(event.target.value) }} className="shadow-sm bg-gray-800 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="For last month rent by Mr.Mark" required />
                                                </div>
                                            </div>
                                        </div>

                                        <button type="submit" onClick={sendMoney}
                                            className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send Money</button>
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

export default BankPay;