// index: '',
// food: '',
// housing: '',
// vehicle: '',
// communication: '',
// education: '',
// ukindex:''



// export const commodityToImage: {} = {
//     'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=022'
// }

export const timeWindowToNumber: { [key: string]: number } = {
	'24H': 0,
	'1W': 1,
	'1M': 2,
	'3M': 3,
	'1Y': 4,
};

export const commodityToImageDefault = 'https://truflation.com/_nuxt/usa-flag.fa372c9d.svg';

export const commodityToImage: { [key: string]: string } = {
    index: 'https://truflation.com/_nuxt/usa-flag.fa372c9d.svg',
    food: 'https://static.thenounproject.com/png/5794710-200.png',
    housing: 'https://static.thenounproject.com/png/1711906-200.png',
    vehicle: 'https://static.thenounproject.com/png/1004852-200.png',
    communication: 'https://static.thenounproject.com/png/5790295-200.png',
    education: 'https://static.thenounproject.com/png/3635847-200.png',
    ukindex: 'https://truflation.com/_nuxt/UK-icon.4580d4a7.svg'
}

export const commodityToName: { [key: string]: string } = {
    index: 'US Inflation Index',
    food: 'US Food Index',
    housing: 'US Housing Index',
    vehicle: 'US Vehicle Index',
    communication: 'US Communication Index',
    education: 'US Education Index',
    ukindex: 'UK Inflation Index'
}

// export const commodityHomePageData: { [key: string]: { [key: string]: string } } = {
//     index: { current: '2.75%', year: '-8.64%' }
// }

export const commodityHomePageCurrentData: { [key: string]: string } = {
    index: '2.75%',
    food: '0.43%',
    housing: '4.31%',
    vehicle: '-0.29%',
    communication: '2.25%',
    education: '3.37%',
    ukindex: '13.36%'
}

export const commodityHomePageYearData: { [key: string]: string } = {
    index: '-8.64%',
    food: '-10.74%',
    housing: '-10.62%',
    vehicle: '-17.94%',
    communication: '1.52%',
    education: '0.79%',
    ukindex: '2.21%'
}

// export const symbolToPriceFeed