import React, { useEffect } from 'react'
import BankTransfer from '../../components/BankTransfer'
import { useAccount, useBalance, useNetwork } from 'wagmi'
import { BigNumber, ethers } from "ethers";
import { EURE_TOKEN_ADDRESS } from "../../constants";
import { useForm } from "react-hook-form";

import {
    MoneriumClient, Chain,
    Network,
    PaymentStandard,
    OrderKind,
    Currency,
} from '@monerium/sdk';

const client = new MoneriumClient("sandbox");

// async function clientAuth() {
//     try {
//         await client.auth({
//             client_id: "19a510a0-fcd0-11ed-9fe1-1e82d6c6448a",
//             client_secret: "65c24138592737cbe4190539d9cbb93d33110bae05ee0dfc22f9bda1c603814c"
//         });
//         await client.getAuthContext();
//         console.log("client", client);

//         // const balances = await client.getBalances();
//         // console.log("balances", balances)
//         // const orders = await client.getOrders();
//         // console.log("orders", orders)
//         // const order = await client.getOrder("0x1234");
//         // const tokens = await client.getTokens();
//         // console.log("tokens", tokens)

//         // const bearerProfile = await client.bearerProfile
//         // console.log("bearerProfile", bearerProfile)

//         // const profile = await client.getProfile("d88499e4-0773-11ed-8b1f-4a76448b7b21");
//         // console.log("profile", profile)

//         // const linkAddress = await client.linkAddress("19a510a0-fcd0-11ed-9fe1-1e82d6c6448a",);
//         // console.log("linkAddress", linkAddress)

//         // const placeOrder = await client.placeOrder();
//         // console.log("placeOrder", placeOrder)

//     }
//     catch (error) {
//         console.log(error);
//     }
// }



const BalanceBanner = ({ daiBalance, eureBalance }) => {
    return (
        <div className="bg-accent/20 px-4 py-4 flex justify-center gap-4 items-center mb-4">
            <p>
                xDAI Balance:{" "}
                <span className="font-bold">
                    {/* {(ethers.utils.formatEther(daiBalance)).toPrecision(4)} */}
                    {daiBalance}
                </span>
            </p>
            <p>
                EURe Balance:{" "}
                <span className="font-bold">
                    {/* {ethers.utils.formatEther(eureBalance)} */}
                    {eureBalance}
                </span>
            </p>
        </div>
    );
};

const BankPage = () => {
    // // const { offRamp } = useOnRamp();
    // const client = new MoneriumClient("sandbox");

    // // create use effect with async function to call clientAuth
    // useEffect(() => {
    //     clientAuth();
    // }, []);




    return (
        <div className='h-screen'>
            {/* <BalanceBanner daiBalance={daiBalance?.value} eureBalance={eureBalance?.value} /> */}

            {/* <BalanceBanner
          daiBalance={daiBalance?.value || BigNumber.from(0)}
          eureBalance={eureBalance?.value || BigNumber.from(0)}
        /> */}
            <BankTransfer />


            {/* giving option for token of choice */}
            {/* <BankTransfer /> */}

            {/* <div className='flex align-middle justify-center rounded'>
                <div className='bg-[#affc41] rounded-2xl'>
                    <div className='pt-4 px-4 rounded'>
                        <h1 className="text-4xl text-white py-4  font-sans">
                            Hey ! 👋
                        </h1>
                        <h2 className="text-base text-white py-2 pb-10 font-sans "> Its time to secure you !</h2>
                    </div>

                    <div className='bg-white text-black rounded-[16px] object-contain w-[500px] h-[400px] relative'>
                        <div className="flex h-full items-center justify-center px-4 inset-x-0 bottom-0">
                            <div className="w-full">

                                <h2 className="text-2xl font-bold mb-4 mt-8">Sell crypto</h2>
                                <p>Convert your EURe to euros in your bank account</p>
                                <form className="flex flex-col gap-2 mt-4 w-full" onSubmit={onSubmit}>

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
                                </form>

                                {/* <div>
                                    <div className='px-6 text-center'>
                                        <input type="String" placeholder="Enter Verification Code" className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className='py-2 items-center justify-center text-center'>
                                        <label htmlFor="my-modal-6" className="btn" >Verify</label>
                                    </div>
                                </div> */}
        </div>
    )
}

export default BankPage