import React, { useEffect, useState } from 'react';
import {
    MoneriumClient, Chain,
    Network,
    PaymentStandard,
    OrderKind,
    Currency
} from '@monerium/sdk';
import { useAccount } from 'wagmi';

// const client = new MoneriumClient("sandbox");

const BankTransfer = () => {
    const client = new MoneriumClient("sandbox");
    const { address } = useAccount();
    const options = {};

    const clientAuth = async () => {
        // console.log(Chain.gnosis)
            await client.auth({
                client_id: "19a510a0-fcd0-11ed-9fe1-1e82d6c6448a",
                client_secret: "65c24138592737cbe4190539d9cbb93d33110bae05ee0dfc22f9bda1c603814c"
            });
            await client.getAuthContext();
            console.log("client", client);

            // const order = await client.placeOrder({
            //     chain: "gnosis",
            //     network: "chaido",
            //     message: options.message,
            //     signature: options.signature,
            //     address: address,
            //     amount: "1",
            //     kind: OrderKind.redeem,
            //     memo: "",
            //     currency: Currency.eur,
            //     counterpart: {
            //         details: {
            //             firstName: "Test",
            //             lastName: "Test",
            //         },
            //         identifier: {
            //             standard: PaymentStandard.iban,
            //             iban: "IS39 4980 5411 0230 0201 4720 37",
            //         },
            //     },
            // });
    
            // console.log("Order: ", order);
    
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
    
            // const linkAddress = await client.linkAddress("19a510a0-fcd0-11ed-9fe1-1e82d6c6448a",);
            // console.log("linkAddress", linkAddress)
    
            // const placeOrder = await client.placeOrder();
            // console.log("placeOrder", placeOrder)
    }


    useEffect(() => {
        clientAuth();
    }, []);

    async function sendMoney(){
        try {
            const order = await client.placeOrder({
                chain: "gnosis",
                network: "chaido",
                message: "hi",
                signature: options.signature,
                address: address,
                amount: "1",
                kind: OrderKind.redeem,
                memo: "",
                currency: Currency.eur,
                counterpart: {
                    details: {
                        firstName: "Test",
                        lastName: "User",
                    },
                    identifier: {
                        standard: PaymentStandard.iban,
                        iban: "IS39 4980 5411 0230 0201 4720 37",
                    },
                },
            });

            console.log("Order: ", order);
        }
        catch (error) {
            console.log("order error",error);
        }
    }
    // await clientAuth();
    return (
        <div>
            <h1>BankTransfer</h1>
            <div>
                <div id='header'>
                    <div className='pt-4 px-4'>
                        <button className='bg-white p-4' onClick={sendMoney}>Send 1 token</button>
                    </div>

                </div>
            </div>

        </div>

    )
}

export default BankTransfer;