import React, { useEffect } from 'react'
import BankPay from '../../../components/BankPay'

const BankPage = () => {

    return (
        <div className=' h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-gray-900 to-black'>
            <BankPay />
        </div>
    )
}

export default BankPage