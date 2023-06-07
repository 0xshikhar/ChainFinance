import LotteryDetail from '../../components/LotteryDetail'
import { useState, useEffect } from 'react'
import { getInflationIndex } from '../../utils/lotteryUtil';


const LotteryPage = () => {
    const [inflationToday, setInflationToday] = useState("7.86");
    const [status, setStatus] = useState('');


    useEffect(() => {
        // init
        // getInflationToday();
    }, [])

    async function getInflationToday() {
        const today = new Date().toJSON().slice(0, 10)
        const inflation = await getInflationIndex(today)
        //console.log(inflation);
        setInflationToday(inflation.yearOverYearInflation)
    }

    return (
        <div className=' h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-gray-900 to-black'>
            <div className=" w-screen items-center mb-10 pt-10 md:mb-12 md:grid-cols-2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-gray-900 to-black">
                <figure className="flex flex-col items-center justify-center  p-5 m-5">

                    <div className="w-full flex flex-row justify-center">
                        <p className="bg-yellow-50 w-auto block my-8 leading-relaxed whitespace-pre-line text-black font-semibold px-4 py-2 rounded-full text-lg">
                            TODAY'S TRUFLATION INDEX: {inflationToday} %
                        </p>
                    </div>

                    <div className="max-w-l p-10 align-middle text-center bg-purple-700 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div>
                            <div className="md:mt-4 md:mb-8 mb-6 md:pb-2 bg-gradient-to-r from-[#fff] via-[#fff]/80 to-[#9d9ea1]/50 bg-clip-text 
                                text-transparent xl:text-[5rem] md:text-6xl font-extrabold font-polySans md:max-w-5xl text-center text-[28px] max-w-[375px]">
                                Lottery Of Inflation </div>
                        </div>
                        <p className="mb-3 font-normal text-center text-gray-300 dark:text-gray-400">
                            Buy tickets and wait till Sunday for the draw, the closest number to the Year Over Year <b>Truflation index</b> of that day will be the winner.

                        </p>
                        <a className="inline-flex justify-center align-middle items-center p-5 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Buy Ticket
                        </a>
                    </div>

                </figure>
                <LotteryDetail />
            </div>

           
        </div>
    )
}

export default LotteryPage