import React, { useEffect } from 'react'
import BankAccount from '../../../components/BankAccount'

const BankPage = () => {

    return (
        <div className='h-screen'>
            {/* <BalanceBanner daiBalance={daiBalance?.value} eureBalance={eureBalance?.value} /> */}

            {/* <BalanceBanner
          daiBalance={daiBalance?.value || BigNumber.from(0)}
          eureBalance={eureBalance?.value || BigNumber.from(0)}
        /> */}
            <BankAccount />
            {/* giving option for token of choice */}
            {/* <BankTransfer /> */}
        </div>
    )
}

export default BankPage