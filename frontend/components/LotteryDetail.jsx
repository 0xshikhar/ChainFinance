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


const LotteryDetail = () => {
    const { chain } = useNetwork();
    const { address } = useAccount();
    const { signMessageAsync } = useSignMessage();

    const [lotteryId, setLotteryId] = useState("0")
	const [lotteryState, setLotteryState] = useState("0")
	const [entranceFee, setEntranceFee] = useState("0")
	const [currentPool, setCurrentPool] = useState("0")
    const [numberOfTickets, setNumberOfTickets] = useState("0")
    const [lotteryHistory, setLotteryHistory] = useState([])
	const [players, setPlayers] = useState([])

	const [inflationToday, setInflationToday] = useState(0);
	const [status, setStatus] = useState('');

    

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
                                
                                    </div>
                                    <div className='py-2'>
                                    
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

                                        <button type="submit"
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

export default LotteryDetail;