import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Navbar.module.css";
import NavItems from "../NavItems";

export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<a href="/">
				<img className={styles.logo} src="/gnof-lm.png"></img>
			</a>
			<div>
				<NavItems />
			</div>

			<ConnectButton></ConnectButton>
		</nav>
	);
}
