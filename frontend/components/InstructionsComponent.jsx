import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
export default function InstructionsComponent() {
	const router = useRouter();
	return (
		<div className={styles.container}>
			

			<h1 className="text-3xl text-white font-bold underline">
					Hello by 0xShikhar
				</h1>
		</div>
	);
}
