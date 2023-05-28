import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAccount, Provider, useProvider, useContract, useSigner } from 'wagmi'
import { SwapContainer } from "../components/SwapContainer";
import toast, { Toaster } from 'react-hot-toast'
import { TbSettingsFilled, TbArrowDown } from 'react-icons/tb'
import ConfigModal from './../components/ConfigModal'
import { BeatLoader } from 'react-spinners'
import { getPrice, getSwapPrice, getEUREContract, getTGNOContract, getGNOFContract, runSwap } from "../utils/AlphaRouterService";
import CurrencyField from "../components/CurrencyField";


export default function Home() {
  // const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  // const [provider, setProvider] = useState(null);
  // const [signer, setSigner] = useState(null);
  // const [contract, setContract] = useState(null);

  const { address, disconnect, isConnected } = useAccount()

  const provider = useProvider();
  const { data: signer, isError, isLoading } = useSigner();
  // console.log("signer", signer, "isError", isError, "isLoading", isLoading);
  // console.log("provider", provider);

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
  const [gnoContract, setGnoContract] = useState("0xb106ed7587365a16b6691a3D4B2A734f4E8268a2")
  const [erueContract, setErueContract] = useState(null)
  const [gnofAmount, setGnofAmount] = useState(0)
  const [gnoAmount, setGnoAmount] = useState(0)
  const [eureAmount, setEureAmount] = useState(0)

  // const getSwapPrice = () => {
  //   if (isConnected) {
  //     // connect gno and eure contracts
  //     gnoContract.balanceOf(address).then(res => {
  //       // setGnoAmount(res.toString())
  //       console.log("gno balance", res.toString());
  //     })
  //   }
  // }

  useEffect(() => {
    const onLoad = async () => {
      const gnofContract = getGNOFContract()
      setGnofContract(unofContract)

      const gnoContract = getTGNOContract()
      setGnoContract(gnoContract)

      const erueContract = getEUREContract()
      setErueContract(erueContract)
    }
    onLoad()
  }, [])

  const getWalletAddress = () => {
    if (isConnected) {
      // connnect gno, gnof and eure contracts
      gnoContract.balanceOf(address).then(res => {
        setGnoAmount(res.toString())
        console.log("gno balance", res.toString());
      })

      // gnofContract.balanceOf(address).then(res => {
      //   setGnofAmount(res.toString())
      //   console.log("gnof balance", res.toString());
      // })

      // erueContract.balanceOf(address).then(res => {
      //   setEureAmount(res.toString())
      //   console.log("eure balance", res.toString());
      // })

    }
  }

  const getSwapPrice = (inputAmount) => {
    setLoading(true)
    setInputAmount(inputAmount)

    const swap = getPrice(
      inputAmount,
      slipageAmount,
      Math.floor(Date.now() / 1000) + (60 * deadlineMins),
      signer
    ).then(res => {
      console.log("res", res);
      setTransaction(res[0])
      setOutputAmount(res[1])
      setRatio(res[2])
      setLoading(false)
      // setOutputAmount(res)
      // setLoading(false)
    })
  }


  return (
    // bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-700 via-orange-300 to-rose-800
    <div className="h-screen bg-black">
      {/* <div className="h-screen bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#affc41] via-[#192e01] to-black"> */}
      <main className={styles.main}>
        {/* <InstructionsComponent>
        </InstructionsComponent> */}
        <div className='bg-[#acff39] w-[35%] text-black p-4 px-6 rounded-xl'>
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
          {/* <button onClick={getSwapPrice}> Check balance </button> */}
          <div className="swapBody">
            <CurrencyField
              field="input"
              tokenName="xDAI"
              getSwapPrice={getSwapPrice}
              signer={signer}
              balance={gnoAmount}
            />

            <CurrencyField
              field="output"
              tokenName="GNOF"
              value={outputAmount}
              signer={signer}
              balance={gnofAmount}
              spinner={BeatLoader}
              readOnly={true}
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
      </main>
    </div>
  );
}
