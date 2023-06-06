export const timeWindowToNumber: { [key: string]: number } = {
	'24H': 0,
	'1W': 1,
	'1M': 2,
	'3M': 3,
	'1Y': 4,
};

export const assets = [];

export const assetToName: { [key: string]: string } = {
	verse: 'Verse',
	trx: 'Tron',
	btc: 'Bitcoin',
	jst: 'JustLend',
	eth: 'Ethereum',
	sun: 'Sunswap',
	nft: 'ApeNFT',
	btt: 'Bittorrent',
	usdt: 'USD Tether',
	usdc: 'USD Circle',
	sol: 'Solana',
	avax: 'Avalanche',
	ada: 'Cardano',
	matic: 'Polygon',
	uni: 'Uniswap',
	bnb: 'Binance',
	dot: 'Polkadot',
	aave: 'Aave',
	snx: 'Synthetix',
	yfi: 'Yearn',
	crv: 'Curve',
	link: 'Chainlink',
	axs: 'Axie Infinity',
	ape: 'Apecoin',
	sushi: 'Sushi',
	fil: 'Filecoin',
	ltc: 'Litecoin',
	doge: 'Dogecoin',
};

export const symbolToCoingeckoId: { [key: string]: string } = {
	verse: 'verse-bitcoin',
	btc: 'bitcoin',
	eth: 'ethereum',
	bnb: 'binancecoin',
	sol: 'solana',
	usdt: 'tether',
	usdc: 'usd-coin',
	xrp: 'ripple',
	matic: 'matic-network',
	ada: 'cardano',
	dot: 'polkadot',
	dai: 'dai',
	ape: 'apecoin',
	avax: 'avalanche-2',
	trx: 'tron',
	link: 'chainlink',
	algo: 'algorand',
	atom: 'cosmos',
	usd: 'usd',
	uni: 'uniswap',
	snx: 'havven',
	yfi: 'yearn-finance',
	crv: 'curve-dao-token',
	aave: 'aave',
	axs: 'axie-infinity',
	xmr: 'monero',
	ltc: 'litecoin',
	shib: 'shiba-inu',
	busd: 'binance-usd',
	icp: 'internet-computer',
	ftm: 'fantom',
	sushi: 'sushi',
	fil: 'filecoin',
	doge: 'dogecoin',
};

export const symbolToPriceFeed: { [key: string]: { [key: string]: string } } = {
	sepolia: {
		verse: '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e',
		eth: '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e',
		btc: '0xECe365B379E1dD183B20fc5f022230C044d51404',
		bnb: '0xcf0f51ca2cDAecb464eeE4227f5295F2384F84ED',
		atom: '0x3539F2E214d8BC7E611056383323aC6D1b01943c',
		link: '0xd8bD0a1cB028a31AA859A21A3758685a95dE4623',
		matic: '0x7794ee502922e2b723432DDD852B3C30A911F021',
		usdc: '0xa24de01df22b63d23Ebc1882a5E3d4ec0d907bFB',
	},
	maticmum: {
		verse: '0x249ca82617ec3dfb2589c4c17ab7ec9765350a18',
		btc: '0x007A22900a3B98143368Bd5906f8E17e9867581b',
		eth: '0x0715A7794a1dc8e42615F059dD6e406A6594651A',
		matic: '0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada',
		usdc: '0x572dDec9087154dC5dfBB1546Bb62713147e0Ab0',
		usdt: '0x92C09849638959196E976289418e5973CC96d645',
		dai: '0x0FCAa9c899EC5A91eBc3D5Dd869De833b06fB046',
	},
	matic: {
		verse: '0x249ca82617ec3dfb2589c4c17ab7ec9765350a18',
		aave: '0x72484B12719E23115761D5DA1646945632979bB6',
		ada: '0x882554df528115a743c4537828DA8D5B58e52544',
		algo: '0x03Bc6D9EFed65708D35fDaEfb25E87631a0a3437',
		ape: '0x2Ac3F3Bfac8fC9094BC3f0F9041a51375235B992',
		avax: '0xe01eA2fbd8D76ee323FbEd03eB9a8625EC981A10',
		axs: '0x9c371aE34509590E10aB98205d2dF5936A1aD875',
		bnb: '0x82a6c4AF830caa6c97bb504425f6A66165C2c26e',
		btc: '0xc907E116054Ad103354f2D350FD2514433D57F6f',
		eth: '0xF9680D99D6C9589e2a93a78A04A279e509205945',
		busd: '0xE0dC07D5ED74741CeeDA61284eE56a2A0f7A4Cc9',
		crv: '0x1CF68C76803c9A415bE301f50E82e44c64B7F1D4',
		dai: '0x4746DeC9e833A82EC7C2C1356372CcF2cfcD2F3D',
		doge: '0xbaf9327b6564454F4a3364C33eFeEf032b4b4444',
		dot: '0xacb51F1a83922632ca02B25a8164c10748001BdE',
		ftm: '0x58326c0F831b2Dbf7234A4204F28Bba79AA06d5f',
		icp: '0x84227A76a04289473057BEF706646199D7C58c34',
		link: '0xd9FFdb71EbE7496cC440152d43986Aae0AB76665',
		ltc: '0xEB99F173cf7d9a6dC4D889C2Ad7103e8383b6Efa',
		matic: '0xAB594600376Ec9fD91F8e885dADF0CE036862dE0',
		mkr: '0xa070427bF5bA5709f70e98b94Cb2F435a242C46C',
		shib: '0x3710abeb1A0Fc7C2EC59C26c8DAA7a448ff6125A',
		snx: '0xbF90A5D9B6EE9019028dbFc2a9E50056d5252894',
		sol: '0x10C8264C0935b3B9870013e057f330Ff3e9C56dC',
		sushi: '0x49B0c695039243BBfEb8EcD054EB70061fd54aa0',
		trx: '0x307cCF7cBD17b69A487b9C3dbe483931Cf3E1833',
		uni: '0xdf0Fb4e4F928d2dCB76f438575fDD8682386e13C',
		usdc: '0xfE4A8cc5b5B2366C1B58Bea3858e81843581b2F7',
		usdt: '0x0A6513e40db6EB1b165753AD52E80663aeA50545',
		vet: '0xD78bc11ef3256e3CE9dC0DF0fa7be9E9afc07f95',
		xmr: '0xBE6FB0AB6302B693368D0E9001fAF77ecc6571db',
		xtz: '0x691e26AB58ff05800E028b0876A41B720b26FC65',
		yfi: '0x9d3A43c111E7b2C6601705D9fcF7a70c95b1dc55',
		zec: '0xBC08c639e579a391C4228F20d0C29d0690092DF0',
	},
};

export const priceFeedToSymbol: { [key: string]: { [key: string]: string } } = {
	sepolia: {
		'0x029824aFf39438D0989124Aaf32e36d8bD9A2D34': 'verse',
		'0xECe365B379E1dD183B20fc5f022230C044d51404': 'btc',
		'0x8A753747A1Fa494EC906cE90E9f37563A8AF630e': 'eth',
		'0x7794ee502922e2b723432DDD852B3C30A911F021': 'matic',
		'0xa24de01df22b63d23Ebc1882a5E3d4ec0d907bFB': 'usdc',
		'0x2bA49Aaa16E6afD2a993473cfB70Fa8559B523cF': 'dai',
		'0xcf0f51ca2cDAecb464eeE4227f5295F2384F84ED': 'bnb',
		'0x3539F2E214d8BC7E611056383323aC6D1b01943c': 'atom',
		'0xd8bD0a1cB028a31AA859A21A3758685a95dE4623': 'link',
	},
	maticmum: {
		'0x029824aFf39438D0989124Aaf32e36d8bD9A2D34': 'verse',
		'0x007A22900a3B98143368Bd5906f8E17e9867581b': 'btc',
		'0x0715A7794a1dc8e42615F059dD6e406A6594651A': 'eth',
		'0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada': 'matic',
		'0x572dDec9087154dC5dfBB1546Bb62713147e0Ab0': 'usdc',
		'0x0FCAa9c899EC5A91eBc3D5Dd869De833b06fB046': 'dai',
		'0x92C09849638959196E976289418e5973CC96d645': 'usdt',
	},
	matic: {
		'0x029824aFf39438D0989124Aaf32e36d8bD9A2D34': 'verse',
		'0x72484B12719E23115761D5DA1646945632979bB6': 'aave',
		'0x882554df528115a743c4537828DA8D5B58e52544': 'ada',
		'0x03Bc6D9EFed65708D35fDaEfb25E87631a0a3437': 'algo',
		'0x2Ac3F3Bfac8fC9094BC3f0F9041a51375235B992': 'ape',
		'0xe01eA2fbd8D76ee323FbEd03eB9a8625EC981A10': 'avax',
		'0x9c371aE34509590E10aB98205d2dF5936A1aD875': 'axs',
		'0x82a6c4AF830caa6c97bb504425f6A66165C2c26e': 'bnb',
		'0xc907E116054Ad103354f2D350FD2514433D57F6f': 'btc',
		'0xF9680D99D6C9589e2a93a78A04A279e509205945': 'eth',
		'0xE0dC07D5ED74741CeeDA61284eE56a2A0f7A4Cc9': 'busd',
		'0x1CF68C76803c9A415bE301f50E82e44c64B7F1D4': 'crv',
		'0x4746DeC9e833A82EC7C2C1356372CcF2cfcD2F3D': 'dai',
		'0xbaf9327b6564454F4a3364C33eFeEf032b4b4444': 'doge',
		'0xacb51F1a83922632ca02B25a8164c10748001BdE': 'dot',
		'0x58326c0F831b2Dbf7234A4204F28Bba79AA06d5f': 'ftm',
		'0x84227A76a04289473057BEF706646199D7C58c34': 'icp',
		'0xd9FFdb71EbE7496cC440152d43986Aae0AB76665': 'link',
		'0xEB99F173cf7d9a6dC4D889C2Ad7103e8383b6Efa': 'ltc',
		'0xAB594600376Ec9fD91F8e885dADF0CE036862dE0': 'matic',
		'0xa070427bF5bA5709f70e98b94Cb2F435a242C46C': 'mkr',
		'0x3710abeb1A0Fc7C2EC59C26c8DAA7a448ff6125A': 'shib',
		'0xbF90A5D9B6EE9019028dbFc2a9E50056d5252894': 'snx',
		'0x10C8264C0935b3B9870013e057f330Ff3e9C56dC': 'sol',
		'0x49B0c695039243BBfEb8EcD054EB70061fd54aa0': 'sushi',
		'0x307cCF7cBD17b69A487b9C3dbe483931Cf3E1833': 'trx',
		'0xdf0Fb4e4F928d2dCB76f438575fDD8682386e13C': 'uni',
		'0xfE4A8cc5b5B2366C1B58Bea3858e81843581b2F7': 'usdc',
		'0x0A6513e40db6EB1b165753AD52E80663aeA50545': 'usdt',
		'0xD78bc11ef3256e3CE9dC0DF0fa7be9E9afc07f95': 'vet',
		'0xBE6FB0AB6302B693368D0E9001fAF77ecc6571db': 'xmr',
		'0x691e26AB58ff05800E028b0876A41B720b26FC65': 'xtz',
		'0x9d3A43c111E7b2C6601705D9fcF7a70c95b1dc55': 'yfi',
		'0xBC08c639e579a391C4228F20d0C29d0690092DF0': 'zec',
	},
};

export const assetToImage: { [key: string]: string } = {
	verse:'https://s3.coinmarketcap.com/static-gravity/image/78e699b46f1742919c102e9dcc8fa45b.png',
	btc: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=022',
	eth: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022',
	matic: 'https://cryptologos.cc/logos/polygon-matic-logo.svg?v=022',
	usdc: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=022',
	link: 'https://cryptologos.cc/logos/chainlink-link-logo.svg?v=022',
	sol: 'https://cryptologos.cc/logos/solana-sol-logo.svg?v=022',
	avax: 'https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=022',
	dot: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.svg?v=022',
	usdt: 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=022',
	uni: 'https://cryptologos.cc/logos/uniswap-uni-logo.svg?v=022',
	crv: 'https://cryptologos.cc/logos/curve-dao-token-crv-logo.svg?v=022',
	aave: 'https://cryptologos.cc/logos/aave-aave-logo.svg?v=022',
	ape: 'https://cryptologos.cc/logos/apecoin-ape-ape-logo.svg?v=023',
	snx: 'https://cryptologos.cc/logos/synthetix-network-token-snx-logo.svg?v=022',
	yfi: 'https://cryptologos.cc/logos/yearn-finance-yfi-logo.svg?v=022',
	sushi: 'https://cryptologos.cc/logos/sushiswap-sushi-logo.svg?v=022',
	bnb: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=022',
	ada: 'https://cryptologos.cc/logos/cardano-ada-logo.svg?v=022',
	doge: 'https://cryptologos.cc/logos/dogecoin-doge-logo.svg?v=022',
	shib: 'https://cryptologos.cc/logos/shiba-inu-shib-logo.svg?v=022',
	// near: 'https://cryptologos.cc/logos/near-protocol-near-logo.svg?v=022',
	dai: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.svg?v=022',
	trx: 'https://cryptologos.cc/logos/tron-trx-logo.svg?v=022',
	ftm: 'https://cryptologos.cc/logos/fantom-ftm-logo.svg?v=022',
	icp: 'https://cryptologos.cc/logos/internet-computer-icp-logo.svg?v=022',
	xmr: 'https://cryptologos.cc/logos/monero-xmr-logo.svg?v=022',
	busd: 'https://cryptologos.cc/logos/binance-usd-busd-logo.svg?v=022',
	ltc: 'https://cryptologos.cc/logos/litecoin-ltc-logo.svg?v=022',
	atom: 'https://cryptologos.cc/logos/cosmos-atom-logo.svg?v=022',
	ftt: 'https://cryptologos.cc/logos/ftx-token-ftt-logo.svg?v=022',
	etc: 'https://cryptologos.cc/logos/ethereum-classic-etc-logo.svg?v=022',
	fil: 'https://cryptologos.cc/logos/filecoin-fil-logo.svg?v=022',
	stx: 'https://cryptologos.cc/logos/stacks-stx-logo.svg?v=022',
	mkr: 'https://cryptologos.cc/logos/maker-mkr-logo.svg?v=022',
	cake: 'https://cryptologos.cc/logos/pancakeswap-cake-logo.svg?v=022',
	zec: 'https://cryptologos.cc/logos/zcash-zec-logo.svg?v=022',
	amp: 'https://cryptologos.cc/logos/amp-amp-logo.svg?v=022',
	linch : 'https://cryptologos.cc/logos/1inch-1inch-logo.svg?v=022',
	kda: 'https://cryptologos.cc/logos/kadena-kda-logo.svg?v=022',
	comp: 'https://cryptologos.cc/logos/compound-comp-logo.svg?v=022',
	ankr: 'https://cryptologos.cc/logos/ankr-ankr-logo.svg?v=022',
	ens: 'https://cryptologos.cc/logos/ethereum-name-service-ens-logo.svg?v=022',
	srm: 'https://cryptologos.cc/logos/serum-srm-logo.svg?v=022',
	mana: 'https://cryptologos.cc/logos/decentraland-mana-logo.svg?v=022',
	leo: 'https://cryptologos.cc/logos/unus-sed-leo-leo-logo.svg?v=022',
	vet: 'https://cryptologos.cc/logos/vechain-vet-logo.svg?v=022',
	axs: 'https://cryptologos.cc/logos/axie-infinity-axs-logo.svg?v=023',
};
