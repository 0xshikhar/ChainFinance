import React, { useEffect, useState } from 'react';
import { useAccount, useNetwork, useBalance } from 'wagmi';
import { EURE_TOKEN_ADDRESS } from "../constants";

export const TokenBalance = () => {
    const { chain } = useNetwork();
    const { address } = useAccount();


    const [euretokenBalance, seteureTokenBalance] = useState(0)
    const [xtokenBalance, setxTokenBalance] = useState(0)
    const [ethtokenBalance, setethTokenBalance] = useState(0)

    const { data: eureBalance } = useBalance({ token: EURE_TOKEN_ADDRESS[chain?.id ?? 31337], address });
    // seteureTokenBalance(eureBalance)

    const { data: daiBalance } = useBalance({
        address,
    });
    // setxTokenBalance(daiBalance)


    return (
        <div>
            <div className='bg-blue-200 rounded-xl py-5 pl-5 my-3'>
                <div className='text-lg'>xDAI Balance : {xtokenBalance} xdai</div>
                <div className='text-lg'>EURe Balance :  {euretokenBalance} eure</div>
                <div className='text-lg'>Ether Balance :  0 Ether</div>

            </div>
        </div>

    )
}
