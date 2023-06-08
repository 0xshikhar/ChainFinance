
import { Dispatch, SetStateAction } from 'react';
import { useNetwork } from 'wagmi';
import { assetToImage } from '../utils/misc';

export default function Banner({
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

	const isBlackAndWhite = (activeChain: string | undefined, symbol: string) => {
		let colored: string[] = [];
		if (activeChain === 'sepolia') {
			colored = ['eth', 'btc', 'matic', 'usdc', 'bnb', 'atom', 'link'];
		} else if (activeChain === 'maticmum') {
			colored = ['eth', 'btc', 'matic', 'usdc', 'usdt', 'dai'];
		}
		else {
			colored = [
				'verse',
				'aave',
				'ada',
				'algo',
				'ape',
				'avax',
				'axs',
				'bnb',
				'btc',
				'eth',
				'busd',
				'crv',
				'dai',
				'doge',
				'dot',
				'ftm',
				'icp',
				'link',
				'ltc',
				'matic',
				'mkr',
				'shib',
				'snx',
				'sol',
				'sushi',
				'trx',
				'uni',
				'usdc',
				'usdt',
				'vet',
				'xmr',
				'xtz',
				'yfi',
				'zec',
			];
		}
		if (colored.includes(symbol)) {
			return false;
		}
		return true;
	};

	const handleBannerChange = (symbol: string) => {
		if (isBlackAndWhite(chain?.network ? chain?.network : 'matic', symbol)) return;
		setActive(0);
		setBannerChoice(symbol);
	};

	return (
		<div className={`overflow-x-scroll ${fullWidth ? 'top-58.78px' : ''} sticky bg-gray-900 flex items-center px-1.2rem py-0.1rem`}>
			{Object.keys(assetToImage).map((symbol) => (
				// <div
				// 	className={`px-0.8rem flex items-center justify-center border-b-3 ${bannerChoice === symbol ? 'border-primary' : 'border-gray-300'
				// 		} ${isBlackAndWhite(chain?.network, symbol) ? '' : 'hover:border-primary cursor-pointer'}`}
				// 	key={symbol}
				// 	onClick={() => handleBannerChange(symbol)}
				// >
				<div key={symbol}
					className={`flex-shrink-0 w-10 h-10 bg-black rounded-full flex items-center justify-center mx-2 first-letter
							${isBlackAndWhite(chain?.network, symbol) ? '' : 'hover:border-primary cursor-pointer'}
						`}
					onClick={() => handleBannerChange(symbol)}
				>
					<img
						className="h-28px w-28px"
						src={assetToImage[symbol]}
						alt={`${symbol}- logo`}
						style={{ padding: "1px", objectFit: 'contain', filter: isBlackAndWhite(chain?.network, symbol) ? 'grayscale(100%)' : '' }}
					/>
				</div>
			))}
		</div>
	);
}
