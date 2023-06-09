
import { Dispatch, SetStateAction } from 'react';
import { useNetwork } from 'wagmi';
import { commodityToImage } from '../utils/marketData';

export default function BannerCommodity({
	bannerChoice,
	showAll,
	fullWidth,
	setBannerChoice,
	setActive,
}: {
	bannerChoice: string;
	showAll: boolean;
	fullWidth: boolean;
	setBannerChoice: Dispatch<SetStateAction<string>>;
	setActive: Dispatch<SetStateAction<number>>;
}) {

	const { chain } = useNetwork();
	const isBlackAndWhite = () => {
		let colored: string[] = [];
		colored = [
			'index',
			'food',
			'housing',
			'vehicle',
			'communication',
			'education',
			'ukindex',
		];
	};

	const handleBannerChange = (symbol: string) => {
		setActive(0);
		setBannerChoice(symbol);
	};

	return (
		<div className={`overflow-x-scroll ${fullWidth ? 'top-58.78px' : ''} sticky bg-[#151515] flex items-center px-1.2rem py-0.1rem`}>
			{Object.keys(commodityToImage).map((symbol) => (
				<div key={symbol}
					className={`flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mx-2 first-letter
						`}
					onClick={() => handleBannerChange(symbol)}
				>
					<img
						className="h-28px w-28px"
						src={commodityToImage[symbol]}
						alt={`${symbol}- logo`}
						style={{ padding: "2px", objectFit: 'contain'}}
					/>
				</div> 
			))}
		</div>
	); 
}
