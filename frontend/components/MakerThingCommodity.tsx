import { useState, Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Select from 'react-select';
import { commodityToImage, commodityToName, commodityHomePageYearData, symbolToPriceFeed } from '../utils/marketData';
import { assetToImage } from '../utils/misc';

import BannerCommodity from './BannerCommodity';

import PredictionMarket from '../../smart-contract/artifacts/contracts/PredictionMarket.sol/PredictionMarket.json';
import { blackTheme } from '../design/themes';
import { ethers } from 'ethers';
import { Spinner } from './Spinner';
import { BiLinkExternal } from 'react-icons/bi';
import { predictionMarketAddresses, exchangeAddresses } from '../utils/addresses';
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useNetwork, useBalance } from 'wagmi';
import { createSvg, generateMetadata, uploadMetadataToIpfs, uploadSVGToIpfs } from '../utils/ipfs';
import { Choices, Market } from '../types';
import { sepoliaOptions, mumbaiOptions, polygonOptions } from '../utils/stuff';

declare var window: any;

const StyledChoice = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	img {
		height: 20px;
		width: 20px;
	}
`;

const symbolToLabel: { [key: string]: JSX.Element } = {
    matic: (
        <StyledChoice>
            <img src={commodityToImage['matic']} alt="logo" />
            <span>MATIC</span>
        </StyledChoice>
    ),
    eth: (
        <StyledChoice>
            <img src={commodityToImage['eth']} alt="logo" />
            <span>ETH</span>
        </StyledChoice>
    ),
};

const customStyles = {
    option: (provided: any, state: any) => ({
        ...provided,
        // borderBottom: '2px solid grey',
        color: state.isSelected ? 'grey' : 'white',
        backgroundColor: blackTheme.background.primary,
        // backgroundColor: state.isSelected ? 'grey' : 'black',
        ':hover': {
            cursor: 'pointer',
            backgroundColor: state.isSelected ? '' : blackTheme.background.secondary,
        },
    }),
    input: (provided: any) => ({
        ...provided,
        color: 'white',
    }),
    control: (provided: any) => ({
        ...provided,
        margin: 0,
        backgroundColor: blackTheme.background.secondary,
        border: 0,
        outline: 'none',
        // This line disable the blue border
        boxShadow: 'none',
    }),
    singleValue: (provided: any) => ({
        ...provided,
        color: 'white',
        // backgroundColor: 'green',
    }),
    menuList: (provided: any) => ({
        ...provided,
        backgroundColor: blackTheme.background.primary,
        paddingTop: 0,
        paddingBottom: 0,
        border: `1px solid ${blackTheme.background.secondary}`,
        // height: '100px',
    }),
    indicatorSeparator: (provided: any) => ({
        ...provided,
        backgroundColor: blackTheme.background.secondary,
    }),
};

const StyledSelect = styled(Select)`
	width: 100%;
	background-color: ${({ theme }) => theme.background.primary};
	outline: none;
`;

type MakerThingProps = {
    asset: string;
    setAsset: Dispatch<SetStateAction<string>>;
    setTxHash: Dispatch<SetStateAction<string>>;
    setConnectMessage: Dispatch<SetStateAction<string>>;
};

const MakerThing = ({ asset, setAsset, setTxHash, setConnectMessage }: MakerThingProps) => {
    const [over, setOver] = useState(true);
    const [positionSize, setPositionSize] = useState('0.001');
    const [strikePrice, setStrikePrice] = useState('0');
    const [expiry, setExpiry] = useState('2023-09-01');
    const [overOdds, setOverOdds] = useState('2');
    const [underOdds, setUnderOdds] = useState('2');
    const [limitOrder, setLimitOrder] = useState('0');

    const [createdMarketId, setCreatedMarketId] = useState(null);
    const [loadingButton, setLoadingButton] = useState(false);

    // create 6 state variable - index, food, housing, vehicle, communication, education, ukindex
    const [indexPrice, setIndexPrice] = useState('0');
    const [foodPrice, setFoodPrice] = useState('0');
    const [housingPrice, setHousingPrice] = useState('0');
    const [vehiclePrice, setVehiclePrice] = useState('0');
    const [communicationPrice, setCommunicationPrice] = useState('0');
    const [educationPrice, setEducationPrice] = useState('0');
    const [ukindexPrice, setUkindexPrice] = useState('0');


    const { address } = useAccount();
    const { chain } = useNetwork();
    const activeChain = chain?.network;

    const { data: activeBalance } = useBalance({
        addressOrName: address,
        enabled: !!address,
    });

    const { data: isApprovedForAll, refetch: refetchIsApprovedForAll } = useContractRead({
        addressOrName: predictionMarketAddresses[activeChain ? activeChain : 'sepolia'],
        contractInterface: PredictionMarket.abi,
        functionName: 'isApprovedForAll',
        args: [address, exchangeAddresses[activeChain ? activeChain : 'sepolia']],
        enabled: !!address && !!chain && !!activeChain,
    });

    const { config: setApprovalForAllConfig } = usePrepareContractWrite({
        addressOrName: predictionMarketAddresses[activeChain ? activeChain : 'sepolia'],
        contractInterface: PredictionMarket.abi,
        functionName: 'setApprovalForAll',
        args: [exchangeAddresses[activeChain ? activeChain : 'sepolia'], true],
    });

    const { isLoading: setApprovalForAllIsLoading, write: writeSetApprovalForAll } = useContractWrite({
        ...setApprovalForAllConfig,
        async onSettled(data, error) {
            if (!data) {
                console.log(error);
                return;
            }

            await data.wait();
            setTxHash(data.hash);

            setTimeout(() => {
                refetchIsApprovedForAll();
            }, 2500);

            setTimeout(() => {
                setTxHash('');
            }, 7500);
        },
    });

    const handlePositionSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // check that position is not too large
        setPositionSize(e.target.value);
    };

    const handleStrikePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStrikePrice(e.target.value);
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExpiry(e.target.value);
    };

    const handleOverOddsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '' || e.target.value.slice(e.target.value.length - 1) === '.') {
            setOverOdds(e.target.value);
            return;
        }
        let overOdds = parseFloat(e.target.value);
        setOverOdds(overOdds.toString());
        let underOdds = 1 / (1 - 1 / overOdds);
        setUnderOdds(underOdds.toFixed(4));
    };

    const handleUnderOddsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '' || e.target.value.slice(e.target.value.length - 1) === '.') {
            setUnderOdds(e.target.value);
            return;
        }
        let underOdds = parseFloat(e.target.value);
        setUnderOdds(underOdds.toString());
        let overOdds = 1 / (1 - 1 / underOdds);
        setOverOdds(overOdds.toFixed(4));
    };

    const handleLimitOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regex = new RegExp('^[0-9]+$');

        if (
            !regex.test(e.target.value.slice(e.target.value.length - 1)) &&
            e.target.value.slice(e.target.value.length - 1) !== '.'
        ) {
            return;
        }
        setLimitOrder(e.target.value);
    };

    const handleChange = (selectedOption: any) => {
        setAsset(selectedOption.value);
    };

    const createMarketWithPosition = async () => {
        if (!activeChain) return;

        const priceFeed = symbolToPriceFeed[activeChain][asset];
        if (!priceFeed) return;

        const DECIMALS = 18;
        const FEED_DECIMALS = 8;
        const market: Market = {
            priceFeed,
            strikePrice: ethers.utils.parseUnits(strikePrice, FEED_DECIMALS),
            expiry: ethers.BigNumber.from(new Date(expiry).getTime() / 1000),
            collateral: ethers.utils.parseUnits(positionSize, DECIMALS),
            ipfsOver: 'ipfs',
            ipfsUnder: 'ifps',
        };

        // odds = collateral / price <=> price = collateral / odds
        let listPrice;
        if (over) {
            listPrice = parseFloat(market.collateral.toString()) / parseFloat(underOdds);
        } else {
            listPrice = parseFloat(market.collateral.toString()) / parseFloat(overOdds);
        }

        const choices: Choices = {
            over,
            listPrice: Math.floor(listPrice).toString(),
            endTime: ethers.BigNumber.from(new Date(expiry).getTime() / 1000),
            tresholdPrice: ethers.BigNumber.from(ethers.utils.parseUnits(limitOrder, DECIMALS)),
        };

        // create svgs here and upload to ipfs
        const [overSVG, underSVG] = createSvg(market, activeChain);
        const [overSVGURI, underSVGURI] = await uploadSVGToIpfs(overSVG, underSVG);
        const [overMetadata, underMetadata] = generateMetadata(market, overSVGURI, underSVGURI, activeChain);
        const [overMetadataURI, underMetadataURI] = await uploadMetadataToIpfs(overMetadata, underMetadata);

        market.ipfsOver = overMetadataURI;
        market.ipfsUnder = underMetadataURI;

        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const predictionMarket = new ethers.Contract(
                predictionMarketAddresses[activeChain],
                PredictionMarket.abi,
                signer
            );

            setLoadingButton(true);
            let tx;
            try {
                tx = await predictionMarket.createMarketWithPosition(market, ...Object.values(choices), {
                    value: market.collateral,
                });
                await tx.wait();
            } catch (e) {
                console.log(e);
                setLoadingButton(false);
                return;
            }
            setLoadingButton(false);

            setTxHash(tx.hash);

            setTimeout(() => {
                setTxHash('');
            }, 20000);
        }
    };

    const handleSetApprovalForAll = () => {
        if (!chain) {
            console.log('connect wallet!');
            setConnectMessage('You need to connect with a wallet before interacting!');

            setTimeout(() => {
                setConnectMessage('');
            }, 7500);
            return;
        }
        writeSetApprovalForAll?.();
    };

    const fetchTruflationContractData = async (asset: string) => {
        if (!activeChain) return;

        if (asset == 'index') {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const truflation = new ethers.Contract(
                    truflationAddresses[activeChain],
                    Truflation.abi,
                    signer
                );
                const index = await truflation.getIndex();
                setIndex(index.toString());
            }
        }
    };

    const options =
        activeChain === 'sepolia' ? sepoliaOptions : activeChain === 'maticmum' ? mumbaiOptions : polygonOptions;

    return (
        <Container>
            {createdMarketId ? (
                <NewMarket>
                    <Link href={`/markets/${createdMarketId}`}>
                        <a target="_blank">
                            View Newly Created Market <BiLinkExternal></BiLinkExternal>
                        </a>
                    </Link>
                </NewMarket>
            ) : null}
            <div className='bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-gray-900 to-black'>
                <div className=" grid align-top content-start justify-start md:grid-cols-2 ">

                    <figure className="flex flex-col items-center justify-center pt-10 ">

                        <Thing>
                            <BannerCommodity
                                showAll={false}
                                bannerChoice={asset}
                                fullWidth={false}
                                setBannerChoice={setAsset}
                                setActive={() => { }}
                            />
                            <SizeDiv>
                                <div className="">
                                    <div className='flex w-full h-[80px]'>
                                        <img className='bg-white p-0.5 h-28px w-28px rounded-xl ' src={commodityToImage[asset]} alt={`commodity-logo`} />
                                        <div className='text-center px-4 text-[28px] '> {commodityToName[asset]}</div>
                                    </div>
                                </div>
                                <div>
                                    <div>Commodity Symbol : {asset.toUpperCase()}</div>
                                </div>
                            </SizeDiv>
                            <MultiDiv>
                                <div className="split top">
                                    <div className="first">
                                        <p> Current Percentage Rate: </p>
                                        <div className='text-[24px] text-white'>{commodityHomePageYearData[asset]}</div>
                                    </div>
                                </div>
                                <div className="split">
                                    <div className="first">

                                        <p> Change in Year Percentage Rate: </p>
                                        <div className='text-[24px] text-white'>{commodityHomePageYearData[asset]}</div>
                                    </div>
                                </div>
                            </MultiDiv>
                            <div className='text-sm text-gray-100'>
                                Using Truflation Smart Contract to fetch Market Data in real time
                            </div>
                            <button className='bg-white rounded p-4 text-black text-[18px]'>
                                Refresh Data
                            </button>
                        </Thing>
                    </figure>

                    <figure className="flex flex-col items-center justify-center pt-10 ">
                        <Thing>
                            <Header>
                                <label>Asset:</label>
                                <StyledSelect
                                    defaultValue={{
                                        label: symbolToLabel[asset],
                                        value: asset,
                                    }}
                                    options={options}
                                    styles={customStyles}
                                    onChange={handleChange}
                                    instanceId="yo"
                                    autoFocus={true}
                                />
                            </Header>
                            <SizeDiv>
                                <div className="inner-size">
                                    <img src={assetToImage[activeChain === 'sepolia' ? 'eth' : 'matic']} alt={`currency-logo`} />
                                    <div className="input-div">
                                        <input type="number" value={positionSize} onChange={handlePositionSizeChange} />
                                    </div>
                                </div>
                                <div className="inner-size">
                                    <p>available: {activeBalance ? activeBalance.formatted.slice(0, 8) : 0}</p>
                                    <p>Position Size</p>
                                </div>
                            </SizeDiv>
                            <MultiDiv>
                                <div className="split top">
                                    <div className="first">
                                        <input type="number" value={strikePrice} onChange={handleStrikePriceChange} />
                                        <p>Strike Price</p>
                                    </div>
                                    <div>
                                        <input type="date " value={expiry} onChange={handleExpiryChange} />
                                        <p>Expiry</p>
                                    </div>
                                </div>
                                <div className="split">
                                    <div className="first">
                                        <input type="string" value={overOdds} onChange={handleOverOddsChange} name="over" />
                                        <p>Over Odds</p>
                                    </div>
                                    <div>
                                        <input type="string" value={underOdds} onChange={handleUnderOddsChange} name="under" />
                                        <p>Under Odds</p>
                                    </div>
                                </div>
                            </MultiDiv>
                            <ToggleDiv>
                                <CustomToggle over={over} onClick={() => setOver(!over)}>
                                    {over && <p>OVER</p>}
                                    <div className="ball"></div>
                                    {!over && <p>UNDER</p>}
                                </CustomToggle>
                            </ToggleDiv>
                            <LimitOrderDiv>
                                <p>
                                    Invalidate order if {asset.toUpperCase()} goes {over ? 'under' : 'over'}:
                                </p>
                                <input type="string" value={limitOrder} onChange={handleLimitOrderChange} />
                            </LimitOrderDiv>
                            <SummaryDiv>
                                <div>
                                    <p>Depositing</p>
                                    <p>
                                        {positionSize} {activeChain === 'sepolia' ? 'ETH' : 'MATIC'}
                                    </p>
                                </div>
                                <div>
                                    <p>Listing {over ? 'UNDER' : 'OVER'} for</p>
                                    <p>
                                        {over
                                            ? `${(parseFloat(positionSize) / parseFloat(underOdds)).toFixed(4)} ${activeChain === 'sepolia' ? 'ETH' : 'MATIC'
                                            }`
                                            : `${(parseFloat(positionSize) / parseFloat(overOdds)).toFixed(4)} ${activeChain === 'sepolia' ? 'ETH' : 'MATIC'
                                            }`}
                                    </p>
                                </div>
                                <div>
                                    <p>Risk</p>
                                    <p>
                                        {over
                                            ? `${(
                                                parseFloat(positionSize) -
                                                parseFloat(positionSize) / parseFloat(underOdds)
                                            ).toFixed(4)} ${activeChain === 'sepolia' ? 'ETH' : 'MATIC'}`
                                            : `${(
                                                parseFloat(positionSize) -
                                                parseFloat(positionSize) / parseFloat(overOdds)
                                            ).toFixed(4)} ${activeChain === 'sepolia' ? 'ETH' : 'MATIC'}`}
                                    </p>
                                </div>
                                <div>
                                    <p>Payout</p>
                                    <p>
                                        {over
                                            ? `${parseFloat(positionSize)} + ${(
                                                parseFloat(positionSize) / parseFloat(underOdds)
                                            ).toFixed(4)} ${activeChain === 'sepolia' ? 'ETH' : 'MATIC'}`
                                            : `${parseFloat(positionSize)} + ${(
                                                parseFloat(positionSize) / parseFloat(overOdds)
                                            ).toFixed(4)} ${activeChain === 'sepolia' ? 'ETH' : 'MATIC'}`}
                                    </p>
                                </div>
                                {setApprovalForAllIsLoading ? (
                                    <Button type="button" l={true}>
                                        <Spinner />
                                    </Button>
                                ) : !isApprovedForAll ? (
                                    <Button type="button" l={false} onClick={handleSetApprovalForAll}>
                                        APPROVE
                                    </Button>
                                ) : null}
                                <>
                                    {!isApprovedForAll ? (
                                        <NotApprovedButton type="button">CREATE MARKET</NotApprovedButton>
                                    ) : loadingButton ? (
                                        <Button l={true}>
                                            <Spinner />
                                        </Button>
                                    ) : (
                                        <Button type="button" l={false} onClick={createMarketWithPosition}>
                                            CREATE MARKET
                                        </Button>
                                    )}
                                </>
                            </SummaryDiv>
                        </Thing>
                    </figure>

                </div>
            </div>

        </Container>
    );
};

const Container = styled.div`
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                `;

const Left = styled.div`
                display: flex;
                flex-direction: column;
                /* padding: 0.5rem 1rem; */
                padding-top: 0.5rem;
                padding-left: 1rem;
                height: calc(105vh - 58.78px);
                /* height: 90%; */
                background-color: ${({ theme }) => theme.background.primary};

                overflow-y: scroll;
                color: ${({ theme }) => theme.text.secondary};
                @media (max-width: 900px) {
                    display: none;
	}
                `;

const Right = styled.div`
                padding: 0.5rem 1rem;
                height: calc(105vh - 58.78px);
                overflow-y: scroll;

                display: flex;
                /* flex-direction: column; */
                justify-content: center;
                /* align-items: center; */

                background-color: ${({ theme }) => theme.background.primary};

                @media (max-width: 400px) {
                    padding: 0.5rem 0;
	}
                `;

const Button = styled.button<{ l: boolean }>`
                margin-top: 0.5rem;
                padding: ${({ l: loading }) => (loading ? '0.5rem 0.75rem' : '0.75rem')};
                outline: none;
                border: none;
                border-radius: 0.2rem;
                color: ${({ theme }) => theme.background.primary};
                font-weight: 600;
                background-color: ${({ theme }) => theme.colors.primary};
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0.9;
                :hover {
                    opacity: 1;
	}
                `;

const NotApprovedButton = styled.button`
                margin-top: 0.5rem;
                padding: 0.75rem;
                outline: none;
                border: none;
                border-radius: 0.2rem;
                color: ${({ theme }) => theme.background.primary};
                font-weight: 600;
                background-color: ${({ theme }) => theme.colors.primary};
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: not-allowed;
                opacity: 0.5;
                `;

const SummaryDiv = styled.div`
                background-color: ${({ theme }) => theme.background.tertiary};
                display: flex;
                flex-direction: column;
                border-radius: 1rem;
                padding: 1rem;
                gap: 0.5rem;
                div {
                    display: flex;
                justify-content: space-between;
                font-size: ${({ theme }) => theme.typeScale.smallParagraph};
	}
                `;

const LimitOrderDiv = styled.div`
                display: flex;
                flex-direction: column;
                gap: 0.75rem;

                p {
                    font - size: ${({ theme }) => theme.typeScale.smallParagraph};
                padding-left: 0.75rem;
	}

                input {
                    color: ${({ theme }) => theme.text.secondary};

                font-size: ${({ theme }) => theme.typeScale.paragraph};
                background-color: ${({ theme }) => theme.background.secondary};
                outline: none;
                border: none;
                width: 100%;
                padding: 0.5rem 0.75rem;
                border-radius: 1rem;
	}
                `;

const CustomToggle = styled.div<{ over: boolean }>`
                background-color: #dddddd;
                height: 40px;
                width: 140px;
                border-radius: 30px;
                display: flex;
                align-items: center;
                justify-content: space-between;
	/* justify-content: ${({ over }) => (over ? 'left' : 'right')}; */
                cursor: pointer;

                p {
                    font - size: ${({ theme }) => theme.typeScale.header4};
                padding: 1.5rem;
                padding-left: ${({ over }) => (over ? '' : '0')};
                padding-right: ${({ over }) => (over ? '0' : '')};
                color: black;
	}

                .ball {
                    background - color: ${({ theme }) => theme.background.primary};
                height: 33px;
                width: 33px;
                border-radius: 100%;
                margin: 0.3rem;
	}
                `;

const ToggleDiv = styled.div`
                display: flex;
                justify-content: center;
                `;

const MultiDiv = styled.div`
                border: 1px solid ${({ theme }) => theme.background.secondary};
                border-radius: 1rem;
                p {
                    font - size: ${({ theme }) => theme.typeScale.smallParagraph};
	}

                .top {
                    border - bottom: 1px solid #262626;
	}

                .split {
                    display: grid;
                grid-template-columns: 1fr 1fr;

                .first {
                    border - right: 1px solid #262626;
		}
                div {
                    padding: 0.8rem;
                display: flex;
                flex-direction: column;
                gap: 0.6rem;

                input {
                    color: ${({ theme }) => theme.text.secondary};

                font-size: ${({ theme }) => theme.typeScale.paragraph};
                background-color: inherit;
                outline: none;
                border: none;
                width: 100%;
				/* text-align: right; */
			}
		}
	}

                .mid {
                    border - top: 1px solid ${({ theme }) => theme.background.tertiary};
                border-bottom: 1px solid ${({ theme }) => theme.background.tertiary};
                padding: 0.8rem;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                div {
                    display: flex;
                justify-content: space-between;
		}
	}
                `;

const SizeDiv = styled.div`
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                border-radius: 1rem;
                background-color: ${({ theme }) => theme.background.secondary};
                padding: 1rem 1.25rem;
                gap: 1rem;

                .inner-size {
                    display: flex;
                justify-content: space-between;

                img {
                    height: 35px;
                width: 35px;
		}

                p {
                    font - size: ${({ theme }) => theme.typeScale.smallParagraph};
		}
	}

                .input-div {
                    width: 100%;
                display: flex;
                align-items: center;
                input {
                    color: ${({ theme }) => theme.text.secondary};

                font-size: ${({ theme }) => theme.typeScale.header2};
                background-color: inherit;
                outline: none;
                border: none;
                width: 100%;
                text-align: right;
		}
	}
                `;

const Header = styled.div`
                display: flex;
                align-items: baseline;
                gap: 0.75rem;
                `;

const Thing = styled.div`
                background-color: ${({ theme }) => theme.background.primary};

                color: ${({ theme }) => theme.text.secondary};
                padding: 1rem;
                width: 500px;
                /* height: 750px; */

                display: flex;
                flex-direction: column;
                gap: 1rem;
                border-radius: 15px;
                border: 2px solid ${({ theme }) => theme.background.tertiary};
                margin: 1rem 0;

                @media (max-width: 600px) {
                    width: 350px;
	}
                `;

const NewMarket = styled.div`
                background-color: ${({ theme }) => theme.background.primary};
                width: 100%;
                height: 150px;
                border-radius: 0.5rem;
                padding: 1rem;
                color: ${({ theme }) => theme.text.secondary};
                a {
                    display: flex;
                justify-content: center;
                align-items: center;
                gap: 3px;
                font-weight: 500;
                :hover {
                    color: ${({ theme }) => theme.text.primary};
		}
	}
                svg {
                    width: 22px;
	}
                `;

export default MakerThing;
