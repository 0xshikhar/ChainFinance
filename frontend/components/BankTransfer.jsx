import React, { useEffect, useState } from 'react';
import { MoneriumClient } from '@monerium/sdk';

const client = new MoneriumClient("sandbox");

async function clientAuth() {
    try {
        await client.auth({
            client_id: "19a510a0-fcd0-11ed-9fe1-1e82d6c6448a",
            client_secret: "65c24138592737cbe4190539d9cbb93d33110bae05ee0dfc22f9bda1c603814c"
        });
        await client.getAuthContext();
        console.log("client", client);

        // const balances = await client.getBalances();
        // console.log("balances", balances)
        // const orders = await client.getOrders();
        // console.log("orders", orders)
        // const order = await client.getOrder("0x1234");
        // const tokens = await client.getTokens();
        // console.log("tokens", tokens)

        // const bearerProfile = await client.bearerProfile
        // console.log("bearerProfile", bearerProfile)

        // const profile = await client.getProfile("d88499e4-0773-11ed-8b1f-4a76448b7b21");
        // console.log("profile", profile)

        const linkAddress = await client.linkAddress("19a510a0-fcd0-11ed-9fe1-1e82d6c6448a",);
        console.log("linkAddress", linkAddress)

        const placeOrder = await client.placeOrder();
        console.log("placeOrder", placeOrder)



    }
    catch (error) {
        console.log(error);
    }
}


function BankTransfer() {

    // useEffect(() => {

    // }, []);
    clientAuth();
    return (
        <div>
            <h1>BankTransfer</h1>
            <button>Send Money</button>

            <div>
                <div id='header'>
                    <div className='pt-4 px-4'>
                        <h1 className="text-4xl text-white py-4  font-sans">
                            Hey ! 👋
                        </h1>
                        <h2 className="text-base text-white py-2 pb-10 font-sans "> Its time to secure you !</h2>
                    </div>

                    <div className='bg-white rounded-[16px] object-contain w-[320px] h-[480px] relative'>
                        <div className="flex h-full items-center justify-center px-4 inset-x-0 bottom-0">
                            <div className="w-full">
                                hello world
                                {/* <WalletAuth /> */}

                                {/* <button onClick={(e) => deploy(e)} className="btn" >
                                    Start Now 🚀
                                </button> */}

                                {/* {deployed ? (
                                    <h2>Scan the QR code using Google Authenticator</h2>
                                ) : (
                                    <button onClick={(e) => deploy(e)} className="btn flex align-middle" >
                                        Generate Your QR Code
                                    </button>
                                )} */}

                                {/* // {deployed ? <h2>SCW Address: {scwAddress}</h2> : <div />} */}
                                {/* {deployed ? (
                                    //     <h2>Please send atleast 0.1 ETH to your SCW</h2>
                                    // ) : (
                                    //     <div />
                                    // )} */}


                                <div>
                                    <img src={uri} width="100%" alt="flux wallet qr code" />
                                    <div className='px-6 text-center'>
                                        <input type="String" placeholder="Enter Verification Code" className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className='py-2 items-center justify-center text-center'>
                                        <label htmlFor="my-modal-6" className="btn" >Verify</label>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default BankTransfer;