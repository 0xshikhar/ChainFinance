import styles from "../styles/Home.module.css";
// import InstructionsComponent from "../components/InstructionsComponent";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAccount, Provider, useProvider, useContract, useSigner } from 'wagmi'



export default function Home() {
  // const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  // const [provider, setProvider] = useState(null);
  // const [signer, setSigner] = useState(null);
  // const [contract, setContract] = useState(null);

  const { address, disconnect, isConnected } = useAccount()
  console.log("account", address, "isConnected", isConnected);

  const provider = useProvider();
  const { data: signer, isError, isLoading } = useSigner();
  console.log("signer", signer, "isError", isError, "isLoading", isLoading);
  console.log("provider", provider);


  return (
    <div className="bg-black h-screen">
      <main className={styles.main}>
        {/* <InstructionsComponent>
        </InstructionsComponent> */}

      </main>
    </div>
  );
}
