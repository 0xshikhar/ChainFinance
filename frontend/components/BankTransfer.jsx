import React, { useEffect, useState } from 'react';
import {
    MoneriumClient, Chain,
    Network,
    PaymentStandard,
    OrderKind,
    Currency
} from '@monerium/sdk';
import { useAccount, useSignMessage } from 'wagmi';

// const client = new MoneriumClient("sandbox");

const BankTransfer = () => {
    // const client = new MoneriumClient("sandbox");
    const [client, setClient] = useState(null);

    const { address } = useAccount();
    const { signMessageAsync } = useSignMessage();

    const [amount, setAmount] = useState("1");
    const [iban, setIban] = useState("IS39 4980 5411 0230 0201 4720 37");

    console.log("monerium client", client)

    const options = {};


    useEffect(() => {
        const initializeClient = async () => {
            const moneriumClient = new MoneriumClient("sandbox");
            setClient(moneriumClient);

            try {
                await moneriumClient.auth({
                    client_id: "19a510a0-fcd0-11ed-9fe1-1e82d6c6448a",
                    client_secret: "65c24138592737cbe4190539d9cbb93d33110bae05ee0dfc22f9bda1c603814c"
                });

                await moneriumClient.getAuthContext();

                const savedRefreshToken = getRefreshToken(address || "");

                if (savedRefreshToken) {
                    await moneriumClient.auth({
                        client_id: MONERIUM_CLIENT_ID,
                        refresh_token: savedRefreshToken,
                    });

                    setIban(await getIban());

                    saveRefreshToken(address || "");
                }
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
                message: "Hi from GNO Finance",
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