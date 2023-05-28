import React from 'react'

const ConfigModal = props => {
    return (
        <div>
            <div className='fixed top-30 left-[500px] w-[30%] h-[35%] bg-white p-5 rounded-2xl z-50 flex items-center justify-center'>
                <div className='rounded-xl' onClick={e => e.stopPropagation}>
                    <div className='justify-end self-end items-end justify-items-end'>
                        <button className=' absolute right-2 top-2' onClick={props.onClose}>X</button>
                    </div>
                    <div className='flex flex-col items-center'>
                        <div className='flex justify-end'>
                            <div className=' text-lg font-bold pb-3'>Transaction Setting       </div>

                        </div>
                        <div className=' flex-col'>

                            <div className='py-3'>
                                <span>Slippage Tolerance</span>
                                <label className='flex space-x-2 py-1'>
                                    <input className=' bg-gray-800 rounded-xl text-white text-lg px-4'
                                        value={props.slipageAmount}
                                        placeholder='1.0%'
                                        onChange={e => props.setSlipageAmount(e.target.value)}
                                    /> <div>min</div>
                                </label>

                            </div>
                            <div className='py-3'>
                                <span>Transaction Deadline</span>
                                <label className='flex space-x-2 py-1'>

                                    <input className='block bg-gray-800 rounded-xl text-white text-lg px-4'
                                        value={props.deadlineMins}
                                        placeholder='10'
                                        onChange={e => props.setDeadlineMins(e.target.value)}
                                    /><div>min</div>
                                </label>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfigModal