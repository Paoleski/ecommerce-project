/* eslint-disable no-unused-vars */
import React from 'react'
import '../styles/subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from './StateProvider'
import { getBasketTotal } from './reducer'

function Subtotal() {
    const [{basket}, dispatch] = useStateValue()
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
                    <p>
                        Subtotal ({basket.length} items): <strong>{value}</strong>
                    </p>
                    <small className="subtotal__gift">
                        <input type="checkbox"/> this order contains a gift
                    </small>
                </>
            )}
            decimalScale={2}
            value={getBasketTotal(basket)}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'R$'}
            />

            <button>Proceed to checkout</button>
        </div>
    )
}

export default Subtotal
