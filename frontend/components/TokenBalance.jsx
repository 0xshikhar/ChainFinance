import React, { useEffect, useState } from 'react';
import { useAccount, useNetwork, useBalance } from 'wagmi';
import { EURE_TOKEN_ADDRESS } from "../constants";

export const TokenBalance = () => {
    const { chain } = useNetwork();
    const { address } = useAccount();


    const [euretokenBalance, seteureTokenBalance] = useState()
    const [xtokenBalance, setxTokenBalance] = useState()
    const [ethtokenBalance, setethTokenBalance] = useState()

    const { data: eureBalance } = useBalance({ token: EURE_TOKEN_ADDRESS[chain?.id ?? 31337], address });
    // seteureTokenBalance(eureBalance)

    const { data: daiBalance } = useBalance({
        address,
    });
    // setxTokenBalance(daiBalance)


    return (
        <div>
            <div className='bg-blue-200 rounded-xl py-5 pl-5 my-3'>
                <p className='text-lg'>xDAI Balance : {xtokenBalance} </p>
                <p className='text-lg'>EURe Balance :  {euretokenBalance}</p>
                <p className='text-lg'>Ether Balance :  0 Ether</p>

            </div>
        </div>

    )
}
