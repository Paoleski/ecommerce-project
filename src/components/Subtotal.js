/* eslint-disable no-unused-vars */
import React from 'react'
import '../styles/subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from './StateProvider'
import { getBasketTotal } from './reducer'
import { useHistory } from 'react-router-dom'

function Subtotal() {
    const [{basket}, dispatch] = useStateValue()
    const history = useHistory()
    console.log(basket)
    
    let value
    if (basket.length > 0) {
        value = basket.reduce((val, item) => val + item.price, 0)
    } else {
        value = 0
    }
    
    return (
        <div className="subtotal">
            <CurrencyFormat renderText={(value) => (
                <>
                    <h3>
                        Order total ({basket.length} items): {value}
                    </h3>
                    <div className="subtotal__items">
                        {basket && basket.map(item => 
                            <p key={(Math.random() * 1000000).toFixed(0)}>{item.title} ${item.price}</p>
                        )}
                    </div>
                </>
            )}
            decimalScale={2}
            value={getBasketTotal(basket)}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
            />

            <button onClick={e => history.push('/payment')}>Proceed to checkout</button>
        </div>
    )
}

export default Subtotal
