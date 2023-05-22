import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Navbar.module.css";
import NavItems from "../NavItems";

export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<a href="https://alchemy.com/?a=create-web3-dapp" target={"_blank"}>
				<img className={styles.alchemy_logo} src="/cw3d-logo.png"></img>

			</a>
			<div>
				<NavItems />
			</div>

			<ConnectButton></ConnectButton>
		</nav>
	);
}
