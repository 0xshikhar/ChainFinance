const { AlphaRouter } = require('@uniswap/smart-order-router')
const { Token, CurrencyAmount, TradeType, Percent } = require('@uniswap/sdk-core')
const { ethers, BigNumber } = require('ethers')
const JSBI = require('jsbi')
const ERC20_ABI = require('../abis/ERC20.json')

// need changes for gnosis chain

const V3_FACTORY = '0xcEB1A356106fE7074E4250964baC86ecca8E67F0'
const V3_ROUTER = '0xE592427A0AEce92De3Edee1F18E0157C05861564'
const V3_SWAP_ROUTER_ADDRESS = '0xE592427A0AEce92De3Edee1F18E0157C05861564'
const chainId = 10200
// need changes for gnosis chain

const NEXT_PUBLIC_GATEWAY_URL = `https://rpc.eu-central-2.gateway.fm/v4/gnosis/archival/chiado?apiKey=${process.env.NEXT_PUBLIC_GATEWAY_GNOSIS_API_KEY}`
const web3provider = new ethers.providers.JsonRpcProvider(NEXT_PUBLIC_GATEWAY_URL)
const router = new AlphaRouter({ chainId: chainId, provider: web3provider })

// default decimals for all erc20 tokens
const decimals = 18

const name0 = 'tGNO Token'
const symbol0 = 'tGNO'
const decimals0 = 18
const address0 = '0x19C653Da7c37c66208fbfbE8908A5051B57b4C70'

const name1 = 'EURe Token'
const symbol1 = 'EURe'
const decimals1 = 18
const address1 = '0xb106ed7587365a16b6691a3D4B2A734f4E8268a2'

const name2 = 'GNOFinance Token'
const symbol2 = 'GNOF'
const decimals2 = 18
const address2 = '0x5a9486D42644Ddc3550289C6B7e60b8a55A45db5'

// creating token instances
const TGNO = new Token(chainId, address0, decimals0, symbol0, name0)
const EURE = new Token(chainId, address1, decimals1, symbol1, name1)
const GNOF = new Token(chainId, address2, decimals2, symbol2, name2)

// getting contract instances
export const getTGNOContract = () => new ethers.Contract(address0, ERC20_ABI, web3provider)
export const getEUREContract = () => new ethers.Contract(address1, ERC20_ABI, web3provider)
export const getGNOFContract = () => new ethers.Contract(address2, ERC20_ABI, web3provider)

// getting token balances from token contract (address = connected wallet address)
export const getTGNObalance = async (address) => {
    const contract = new ethers.Contract(address0, ERC20_ABI, web3provider)
    const balance = await contract.balanceOf(address)
    console.log("balance", balance.toString())
    return balance
}


// getting token prices from uniswap v3
export const getPrice = async (inputAmount, slippageAmount, deadline, walletAddress) => {
    const percentSlippage = new Percent(JSBI.BigInt(slippageAmount), JSBI.BigInt(10000))
    const trade = await router.bestTradeExactIn(
        [TGNO, EURE, GNOF],
        CurrencyAmount.fromRawAmount(TGNO, inputAmount),
        GNOF,
        { maxHops: 3, maxNumResults: 1, maxTotalPrice: CurrencyAmount.fromRawAmount(GNOF, inputAmount) },
        { tradeType: TradeType.EXACT_INPUT, recipient: walletAddress, feeOnTransfer: false, allowedSlippage: percentSlippage, deadline: deadline }
    )
    const wei = ethers.utils.parseEther(inputAmount.toString(), decimals)
    const currencyAmount = CurrencyAmount.fromRawAmount(TGNO, JSBI.BigInt(wei))

    const route = await router.route(
        currencyAmount,
        GNOF,
        TradeType.EXACT_INPUT,
        {
            recipient: walletAddress,
            slippageTolerance: percentSlippage,
            deadline: deadline,
        }
    )
    console.log("route", route)

    const transaction = {
        data: route.methodParameters.calldata,
        to: V3_SWAP_ROUTER_ADDRESS,
        value: BigNumber.from(route.methodParameters.value),
        from: walletAddress,
        gasPrice: BigNumber.from(route.gasPriceWei),
        gasLimit: ethers.utils.hexlify(1000000)
    }
    console.log("transaction", transaction)

    const quoteAmountOut = route.quote.toFixed(6)
    const ratio = (quoteAmountOut / inputAmount).toFixed(3)
    return [
        transaction,
        quoteAmountOut,
        ratio
    ]
    console.log("quoteAmountOut", quoteAmountOut)
    console.log("ratio", ratio)
}

export const runSwap = async (transaction, signer) => {
    const approveAmount = ethers.utils.parseUnits('10', 18).toString()
    const approveTx = await signer.sendTransaction({
        to: address0,
        data: '0x095ea7b3000000000000000000000000' + V3_ROUTER.slice(2) + approveAmount.slice(2),
        value: 0,
        gasPrice: BigNumber.from('1000000000'),
        gasLimit: ethers.utils.hexlify(1000000)
    })
    await approveTx.wait()

    // get weth contract 
    const contract0 = getTGNOContract()
    await contract0.connect(signer).approve(
        V3_SWAP_ROUTER_ADDRESS,
        approveAmount
    )

    signer.sendTransaction(transaction)
}
