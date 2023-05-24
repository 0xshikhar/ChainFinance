import React from 'react';
import toast, { Toaster } from 'react-hot-toast'
// import { ArrowSmDownIcon, CogIcon } from '@heroicons/react/outline'
import { useAccount, useContract, useProvider, useSigner } from 'wagmi'
import { TbSettingsFilled, TbArrowDown} from 'react-icons/tb'
// import { useWeb3React } from '@web3-react/core'


export const SwapContainer = () => {
    return (

        <div className='bg-zinc-900 w-[35%] p-4 px-6 rounded-xl'>
            <div className='flex items-center justify-between py-4 px-1'>
                <p>Swap</p>
                <TbSettingsFilled className='h-6' />
            </div>
            <div className='relative bg-[#212429] p-4 py-6 rounded-xl mb-2 border-[2px] border-transparent hover:border-zinc-600'>
                {/* {srcTokenComp} */}

                <TbArrowDown className='absolute left-1/2 -translate-x-1/2 -bottom-6 h-10 p-1 bg-[#212429] border-4 border-zinc-900 text-zinc-300 rounded-xl cursor-pointer hover:scale-110'
                // onClick={handleReverseExchange}
                />
            </div>

            <div className='bg-[#212429] p-4 py-6 rounded-xl mt-2 border-[2px] border-transparent hover:border-zinc-600'>
                {/* {destTokenComp} */}
            </div>

            <button
                // className={getSwapBtnClassName()}
                // onClick={() => {
                //     if (swapBtnText === INCREASE_ALLOWANCE) handleIncreaseAllowance()
                //     else if (swapBtnText === SWAP) handleSwap()
                // }}
            >
                {/* {swapBtnText} */} 
            </button>

            {/* {txPending && <TransactionStatus />} */}

            <Toaster />
        </div>
    )
}
