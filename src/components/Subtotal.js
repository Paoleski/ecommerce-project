/* eslint-disable no-unused-vars */
import React from 'react'
import '../styles/subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from './StateProvider'
import { getBasketTotal } from './reducer'
import { useHistory } from 'react-router-dom'

function Subtotal() {
    const [{basket, user}, dispatch] = useStateValue()
    const history = useHistory()

    const total = getBasketTotal(basket)

    const handleCheckout = (e) => {
      if (user.emailVerified) {
         return history.push('/payment')
      }
      history.push('/emailconfirmation')
    }
    
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

            <button onClick={handleCheckout}>Proceed to checkout</button>
        </div>
    )
}

export default Subtotal
