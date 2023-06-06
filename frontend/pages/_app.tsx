import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { blackTheme, GlobalStyle } from '../design/themes';
import Layout from '../components/Layout';
import Head from 'next/head';
// import dotenv from 'dotenv';
// dotenv.config();

import '../style/global.css'

const { chains, provider } = configureChains(
	[chain.mainnet, chain.goerli, chain.sepolia, chain.polygon, chain.polygonMumbai ],
	[alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
	appName: 'Chain Finance',
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={blackTheme}>
			<GlobalStyle />
			<QueryClientProvider client={queryClient}>
				<Head>
					<title>Chain Finance</title>
					<meta property="og:title" content="Chain Finance" key="title" />
				</Head>
				<WagmiConfig client={wagmiClient}>
					<RainbowKitProvider
						chains={chains}
						theme={darkTheme({
							accentColor: blackTheme.colors.primary,
							accentColorForeground: 'white',
							borderRadius: 'small',
							fontStack: 'system',
						})}
					>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</RainbowKitProvider>
				</WagmiConfig>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default MyApp;
