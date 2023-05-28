import React from 'react'

const CurrencyField = props => {
    const getPrice = (value) => {
        props.getSwapPrice(value)
    }

    return (
        <div className='flex'>
            <div>
                {props.loading ? (
                    <div className='spinnerContainer'>
                        <props.spinner color='#acff39' />
                    </div>
                ) :
                    (
                        <input className='currencyInputField'
                            placeholder='0.0'
                            value={props.value}
                            onBlur={e => (props.field === 'input') ? getPrice(e.target.value) : null}
                        />
                    )
                }
            </div>

            <div>
                <span className='text-lg font-bold'>
                    {props.tokenName}
                </span>

                <div className='balance container'>
                    <div>
                        Balance: {props.balance?.toFixed(4)}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CurrencyField