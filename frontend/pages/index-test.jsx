import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAccount, Provider, useProvider, useContract, useSigner } from 'wagmi'
import { SwapContainer } from "../components/SwapContainer";
import toast, { Toaster } from 'react-hot-toast'
import { TbSettingsFilled, TbArrowDown } from 'react-icons/tb'
import ConfigModal from '../components/ConfigModal'
import { BeatLoader } from 'react-spinners'
// import { getPrice, getSwapPrice, getEUREContract, getTGNOContract, getGNOFContract, runSwap } from "../utils/AlphaRouterService";
import CurrencyField from "../components/CurrencyField";

import swapAbi from '../abis/UnofDexSwap'
import makeContract from "../utils/make_contract";
import makeSwapContract from "../contracts/SwapContract";

import TokenSelectDropDown from '../components/swap/TokenSelectDropDown'
import TokenQuantityInput from '../components/swap/TokenQuantityInput'
import TokenQtyValueView from '../components/swap/TokenQtyValueView'
import makeTokens from '../data/make_tokens'
import Web3 from 'web3'

export default function Home() {
  const [balance, setBalance] = useState(null);
  const { address, disconnect, isConnected } = useAccount()
  const provider = useProvider();
  const { data: signer, isError, isLoading } = useSigner();



  const [qty, setQty] = useState('0')
  const [toQty, setToQty] = useState('0')

  const [web3, setWeb3] = useState(null)
  const [tokens, setTokens] = useState(null)
  const [fromToken, setFromToken] = useState(null)
  const [toToken, setToToken] = useState(null)
  const [showDropDown, toggleDropDown] = useState(false)
  const [isApprovalNeeded, setIsApprovalNeeded] = useState(false)

  const [isFromTokenDropDown, setIsFromTokenDropDown] = useState(true)

  const [ifLoading, setLoading] = useState(false)
  const [isSwapSuccess, setIsSwapSuccess] = useState(false)

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
    if (isConnected) {
      // const web3Provider = new ethers.providers.JsonRpcProvider(NEXT_PUBLIC_GATEWAY_GNOSIS_API_KEY)
      setWeb3(new Web3(Web3.givenProvider))
      console.log("web3", web3)
    }
    if (web3 !== null || ethereum !== null) {
      setTokens(makeTokens(web3))
    }
    // const onLoad = async () => {
    // const gnofContract = getGNOFContract()
    // setGnofContract(unofContract)

    // const gnoContract = getTGNOContract()
    // setGnoContract(gnoContract)

    // const erueContract = getEUREContract()
    // setErueContract(erueContract)
    // }
  }, [web3])

  const getWalletAddress = () => {

    // connnect gno, gnof and eure contracts

    // gnoContract.balanceOf(address).then(res => {
    //   setGnoAmount(res.toString())
    //   console.log("gno balance", res.toString());
    // })

    // gnofContract.balanceOf(address).then(res => {
    //   setGnofAmount(res.toString())
    //   console.log("gnof balance", res.toString());
    // })

    // erueContract.balanceOf(address).then(res => {
    //   setEureAmount(res.toString())
    //   console.log("eure balance", res.toString());
    // })

  }


  const swap = async () => {
    setLoading(true)

    // referring to dex swap
    try {
      const swapContract = makeSwapContract(web3, swapAbi.abi, swapAbi.address)

      if (fromToken === null) {
        alert('Please select send token')
        return
      }

      if (toToken === null) {
        alert('Please select receive token')
        return
      }

      if (fromToken === toToken) {
        alert('Send token and Receive token cannot be same');
      }

      if (qty === '0') {
        alert('Enter valid quantity')
        return
      }

      var data;
      if (fromToken.address === FilDexConstants.nativeContractAddress) {
        data = await swapContract.swapNativeToken(
          account,
          toToken.address,
          qty
        )
      } else {
        data = await swapContract.swapNonNativeToken(
          account,
          fromToken.address,
          toToken.address,
          qty
        )
      }


      setIsSwapSuccess(true)
      console.log(data)
    } catch (e) {
      setIsSwapSuccess(false)
      console.log(e)
    } finally {
      setLoading(false)
    }
    // const swap = getPrice(
    //   inputAmount,
    //   slipageAmount,
    //   Math.floor(Date.now() / 1000) + (60 * deadlineMins),
    //   signer
    // ).then(res => {
    //   console.log("res", res);
    //   setTransaction(res[0])
    //   setOutputAmount(res[1])
    //   setRatio(res[2])
    //   setLoading(false)
    //   // setOutputAmount(res)
    //   // setLoading(false)
    // })

  }

  const approve = async () => {
    setLoading(true)
    try {
      if (fromToken === null) {
        alert('select from token')
        return
      }

      if (qty === '0') {
        alert('Enter some quantity')
        return
      }

      const data = await fromToken.approveContract(
        account,
        swapAbi.address
      )
      console.log(data)
    } catch (e) {
      console.log('Failed Approval ' + e)
    } finally {
      setLoading(false)
      getAllowance(fromToken)
    }
  }

  function getFromTokenFromIndex(index) {
    const keys = Object.keys(tokens)
    const token = tokens[keys[index]]
    setFromToken(token)
    return token
  }

  const getAllowance = async (token) => {
    const fromTokenAllowance = await token.getAllowance(
      account,
      swapAbi.address
    )
    console.log(fromTokenAllowance)
    if (fromTokenAllowance <= 0) {
      setIsApprovalNeeded(true)
      return
    } else {
      setIsApprovalNeeded(false)
    }
  }

  const updateQuantities = async (fromQty) => {
    const swapContract = makeSwapContract(web3, swapAbi.abi, swapAbi.address)
    if (fromToken !== null && toToken !== null && fromQty !== null && fromQty !== '') {
      var toQuantity
      console.log(fromQty)
      if (fromToken.address === FilDexConstants.nativeContractAddress) {
        toQuantity = await swapContract.getNativeQuote(toToken.address, fromQty)
      } else {
        toQuantity = await swapContract.getNonNativeQuote(
          fromToken.address,
          toToken.address,
          fromQty
        )
      }
      console.log(toQuantity)
      setQty(fromQty)
      setToQty(toQuantity)
    } else {
      setToQty('0')
    }
  }

  return (
    // bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-700 via-orange-300 to-rose-800
    <div>
      <div className='flex flex-row justify-center'>
        {isSwapSuccess ? (
          <SwapSuccess
            toName={toToken.name}
            fromName={fromToken.name}
            fromQty={qty}
            toQty={toQty}
            fromLogo={fromToken.logo}
            toLogo={toToken.logo}
          />
        ) : showDropDown ? (
          <TokenDropList
            tokens={tokens}
            toggleDropDown={toggleDropDown}
            updateSelectedToken={(token, isFromToken) => {
              if (isFromToken) {
                setFromToken(token)
                getAllowance(token)
              } else {
                setToToken(token)
              }
            }}
            isFromTokenDropDown={isFromTokenDropDown}
          />
        ) : (
          <div className="flex justify-start flex-col m-8 bg-slight-black text-grey-font rounded-lg p-4 w-1/3">
            <div className="text-sm mb-6">You send</div>
            <div className="flex justify-start">
              {tokens && (
                <TokenSelectDropDown
                  token={fromToken ?? getFromTokenFromIndex(0)}
                  account={account}
                  toggleDropDown={(value) => {
                    setIsFromTokenDropDown(true);
                    toggleDropDown(value);
                  }}
                />
              )}
              <div className="ml-2" />
              <TokenQuantityInput onInput={updateQuantities} />
            </div>
            <div className="mb-8" />
            <hr className="border-hover-stroke border-2" />
            <div className="mb-4" />
            <div className="text-sm mb-6">You receive</div>
            <div className="flex justify-start">
              {tokens && (
                <TokenSelectDropDown
                  token={toToken}
                  account={account}
                  toggleDropDown={(value) => {
                    setIsFromTokenDropDown(false);
                    toggleDropDown(value);
                  }}
                />
              )}
              <div className="ml-2" />
              <TokenQtyValueView tokenQuantity={toQty} tokenPrice="0.00" />
            </div>
            <div className="mb-4" />
          </div>
        )}
      </div>
      <div className='flex justify-center'>
        {isSwapSuccess ? (
          <button
            className='rounded-full bg-white px-20 py-3 text-xl'
            onClick={() => {
              setIsSwapSuccess(false)
            }}
          >
            Return to swap
          </button>
        ) : isLoading ? (
          <button className='rounded-full bg-loading-fill px-20 py-3 text-xl text-black'>
            Submitting ...
          </button>
        ) : (
          <button
            className='rounded-full bg-white px-20 py-3 text-xl'
            onClick={
              swap
            }
          >
            'Swap'
          </button>
        )}
      </div>
      <Toaster />
    </div >

  );
}
