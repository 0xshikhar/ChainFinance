import React, { useEffect, useState } from 'react';
import { useAccount, useNetwork, useBalance } from 'wagmi';
import { EURE_TOKEN_ADDRESS } from "../constants";
import { ethers,BigNumber } from "ethers";

export const TokenBalance = () => {
    const { chain } = useNetwork();
    const { address } = useAccount();

    const { data: eureBalance } = useBalance({ token: EURE_TOKEN_ADDRESS[chain?.id ?? 31337], address });
    const { data: daiBalance } = useBalance({ address });
    console.log("eureBalance", eureBalance?.value);

    // if (eureBalance?.value) {
    //     setEureTokenBalance(ethers.utils.formatEther(eureBalance?.value));
    //     console.log("eureBalance 2", ethers.utils.formatEther(eureBalance?.value));
    // }

    // useEffect(() => {
    //     // setEureTokenBalance(eureBalance.formatted);
    //     // setXTokenBalance(daiBalance.formatted);
    // }, [address, eureBalance, daiBalance]);

    return (
        <div>
            <div className='bg-blue-200 rounded-xl py-5 pl-5 my-3'>
                <BalanceBanner
                    daiBalance={daiBalance?.value || BigNumber.from(0)}
                    eureBalance={eureBalance?.value || BigNumber.from(0)}
                />
                {/* <div className='text-lg'>xDAI Balance: {xtokenBalance} xdai</div>
                <div className='text-lg'>EURe Balance: {eureTokenBalance} eure</div>
                <div className='text-lg'>Ether Balance: {ethTokenBalance} Ether</div> */}
            </div>
        </div>
    );
};
