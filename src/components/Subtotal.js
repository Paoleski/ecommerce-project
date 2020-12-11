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
    
    // let value
    // if (basket.length > 0) {
    //     value = basket.reduce((val, item) => val + Number(item.price), 0)
    //     console.log(typeof(value))
    // } else {
    //     value = 0
    // }

    const total = getBasketTotal(basket)
    
    return (
        <div className="subtotal">
            <CurrencyFormat renderText={(total) => (
                <>
                    <h3>
                        Order total ({basket.length} items):{total}
                    </h3>
                    <div className="subtotal__items">
                        {basket && basket.map((item,i) => 
                            <p key={(Math.random() * 1000000).toFixed(0)}><strong>{i+1}:</strong> {item.title} ${item.price}</p>
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
