import type { NextPage } from 'next';
import { useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

import PriceChartContainer from '../../components/Chart/PriceChartContainer';
import BannerCommodity from '../../components/BannerCommodity';

import { FiExternalLink } from 'react-icons/fi';
import { useNetwork } from 'wagmi';

const MakerThing = dynamic(() => import('../../components/MakerThingCommodity'), {
	ssr: false,
});

const Container = styled.div`
	display: grid;
	width: 100%;
`;

const Maker: NextPage = () => {
	const { chain, chains } = useNetwork();
	const [commodity, setCommodity ] = useState('index');
	const asset1 = { symbol: 'usd', coingeckoId: 'usd' };
	const [txHash, setTxHash] = useState('');
	const [connectMessage, setConnectMessage] = useState('');

	const explorer =
		chain?.network === 'sepolia'
			? 'https://sepolia.etherscan.io/tx'
			: chain?.network === 'maticmum'
				? 'https://mumbai.polygonscan.com/tx'
				: 'https://polygonscan.com/tx';

	const dimensions = {
		height: '84%',
		width: '100%',
		chartHeight: 'calc(100% - 125px)',
	};

	return (
		<>
			{connectMessage !== '' && (
				<NewTx>
					<p>{connectMessage}</p>
				</NewTx>
			)}
			{txHash !== '' && (
				<NewTx>
					<a href={`${explorer}/${txHash}`} target="_blank" rel="noreferrer">
						Tx Hash: {txHash} <FiExternalLink />
					</a>
				</NewTx>
			)}
			<Container>
				{/* <Left>
					<BannerCommodity
						showAll={false}
						bannerChoice={asset}
						fullWidth={false}
						setBannerChoice={setAsset}
						setActive={() => {}}
					/>
					<PriceChartContainer
						height={dimensions.height}
						width={dimensions.width}
						chartHeight={dimensions.chartHeight}
						asset0={asset}
						asset1={asset1}
					></PriceChartContainer>
				</Left> */}
				<MakerThing
					commodity={commodity}
					setAsset={setCommodity}
					setTxHash={setTxHash}
					setConnectMessage={setConnectMessage}
				/>
			</Container>
		</>
	);
};


const NewTx = styled.div`
	background-color: ${({ theme }) => theme.background.primary};
	width: 100vw;
	padding-top: 1rem;
	padding-bottom: 0.5rem;
	display: flex;
	justify-content: center;
	align-items: center;

	a {
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 3px;
		font-weight: 500;
		padding-bottom: 0.1rem;
		/* border-bottom: 2px solid ${({ theme }) => theme.colors.primary}; */
		:hover {
			color: ${({ theme }) => theme.colors.primary};
		}
	}
	svg {
		width: 22px;
	}
	p {
		color: white;
		font-weight: 500;
		padding-bottom: 0.1rem;
	}
`;

export default Maker;
