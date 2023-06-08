import { SwapWidget, Theme } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'

// Default token list from Uniswap
const UNISWAP_TOKEN_LIST = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org'

// Use the native token of the connected chain as the default input token
const VERSE = '0x249cA82617eC3DfB2589c4c17ab7EC9765350a18' // Special address for native token

// WBTC as the default output token
const LINK = '0x514910771af9ca656af840dff83e8264ecf986ca'

const swap = () => {
    const theme: Theme = {
        primary: '#001D82',
        secondary: '#6677C1',
        interactive: '#005BAE',
        container: '#ABD6FE',
        module: '#FFF7FB',
        accent: '#FF7BC2',
        outline: '#ABD6FE',
        dialog: '#FFF',
        fontFamily: 'Arvo',
    }

    return (
        <div className="h-screen pt-12 flex justify-center align-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-gray-900 to-black">
            <div className="Uniswap">
                <SwapWidget
                    tokenList={UNISWAP_TOKEN_LIST}
                    defaultInputTokenAddress={VERSE}
                    defaultInputAmount={2}
                    defaultOutputTokenAddress={LINK}
                    theme={theme} 
                />
            </div>
        </div>
    )
}

export default swap