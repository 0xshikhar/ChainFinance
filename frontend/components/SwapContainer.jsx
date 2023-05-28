import { React, useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast'
// import { ArrowSmDownIcon, CogIcon } from '@heroicons/react/outline'
import { useAccount, useContract, useProvider, useSigner } from 'wagmi'
import { TbSettingsFilled, TbArrowDown } from 'react-icons/tb'
// import { useWeb3React } from '@web3-react/core'
import ConfigModal from './ConfigModal'
import {BeatLoader} from 'react-spinners'

export const SwapContainer = () => {
    // creating states for src, dest, showModdal,txPending,
    const [srcToken, setSrcToken] = useState(null)
    const [destToken, setDestToken] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [txPending, setTxPending] = useState(false)
    const [deadlineMins, setDeadlineMins] = useState(10)
    const [slipageAmount, setSlipageAmount] = useState(2)


    // creating states for inputAmount, outputAmount, transaction, srcTokenComp, destTokenComp, loading, ration, gnofContract,erueContract,gnofAmount, eureAmount
    const [inputAmount, setInputAmount] = useState(0)
    const [outputAmount, setOutputAmount] = useState(0)
    const [transaction, setTransaction] = useState(null)
    const [srcTokenComp, setSrcTokenComp] = useState(null)
    const [destTokenComp, setDestTokenComp] = useState(null)
    const [loading, setLoading] = useState(false)
    const [ratio, setRatio] = useState(0)
    const [gnofContract, setGnofContract] = useState(null)
    const [erueContract, setErueContract] = useState(null)
    const [gnofAmount, setGnofAmount] = useState(0)
    const [eureAmount, setEureAmount] = useState(0)

    



    console.log("deadlineMins", deadlineMins, "slipageAmount", slipageAmount);
    return (

        <div className='bg-[#acff39] w-[35%] p-4 px-6 rounded-xl'>
            <div className='flex items-center justify-between py-4 px-1'>
                <div className='text-lg font-bold '>Swap</div>
                <TbSettingsFilled className='h-6' onClick={() => setShowModal(true)} />
                {showModal && (
                    <ConfigModal
                        onClose={() => setShowModal(false)}
                        setDeadlineMins={setDeadlineMins}
                        setSlipageAmount={setSlipageAmount}
                        deadlineMins={deadlineMins}
                        slipageAmount={slipageAmount}
                    />
                )}
            </div>
            <div className="swapBody">
                <CurrencyField
                    field="input"
                    tokenName="xDAI"
                    getSwapPrice={getSwapPrice}
                    signer={signer}
                    balance={xdaiAmount}
                />
                <CurrencyField
                    field="output"
                    tokenName="UNOF"
                    value={outputAmount}
                    signer={signer}
                    balance={unofAmount}
                    spinner={BeatLoader}
                />
            </div>

            <div className='relative bg-white p-4 py-6 rounded-xl mb-2 border-[2px] border-transparent hover:border-zinc-600'>
                {/* {srcTokenComp} */}

                <TbArrowDown className='absolute left-1/2 -translate-x-1/2 -bottom-6 h-10 p-1 bg-[#0a58de] border-4 border-zinc-900 text-zinc-300 rounded-xl cursor-pointer hover:scale-110'
                // onClick={handleReverseExchange}
                />
            </div>

            <div className='bg-white p-4 py-6 rounded-xl mt-2 border-[2px] border-transparent hover:border-zinc-600'>
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
