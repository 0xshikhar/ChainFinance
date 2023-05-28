import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, useAccount, WagmiConfig } from "wagmi";
import { mainnet, goerli, gnosisChiado, gnosis, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import MainLayout from "../layout/mainLayout";
import { useRouter } from "next/router";
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useConnect, useDisconnect, useBalance } from 'wagmi'




const { chains, provider, webSocketProvider } = configureChains(
  [gnosisChiado, gnosis],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: `https://rpc.eu-central-2.gateway.fm/v4/gnosis/archival/chiado?apiKey=${process.env.NEXT_PUBLIC_GATEWAY_GNOSIS_API_KEY}`,
      }),
    }), publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: "GNOFinance",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
  chains,
  persister: null,
});


// const config = createConfig({
//   autoConnect: true,
//   publicClient,
//   connectors: [
//     new InjectedConnector({
//       chains,
//       options: {
//         name: 'Injected',
//         shimDisconnect: true,
//       },
//     })
//   ]
// })

export { WagmiConfig, RainbowKitProvider };

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // const { connect, isConnecting } = useConnect({
  //   connector: new InjectedConnector(),
  // })
  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {
      if (!isReconnected) router.reload();
    },
  });
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        modalSize="compact"
        initialChain={process.env.NEXT_PUBLIC_DEFAULT_CHAIN}
        chains={chains}
      >
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
