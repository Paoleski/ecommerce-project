import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import '../styles/payment.css';
import CheckoutProduct from './CheckoutProduct';
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider';
import axios from 'axios'

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue()

  const history = useHistory()
  const stripe = useStripe()
  const elements = useElements()

  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [processing, setProcessing] = useState('')
  const [succeeded, setSucceeded] = useState(false)
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {

    const getClientSecret = async () => {
        const response = await axios({
            method:'POST',
            // strip expects the total in currencies subunits (use full cents 10$ === 10000)
            url:`/payments/create?total=${getBasketTotal(basket) * 100}`
        })
        setClientSecret(response.data.clientSecret)
    }

    getClientSecret()
  }, [basket])


  const handleSubmit = async event => {
    // fancy stripe stuff
    event.preventDefault()
    setProcessing(true)

    const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method:{
            card: elements.getElement(CardElement)
        }
    }).then(({ paymentIntent }) => {
        setSucceeded(true)
        setError(null)
        setProcessing(false)

        history.replace('/orders')
    }) 
  };

  const handleChange = (event) => {
    // listen for changes in the cardElement and display errors as the customer type card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        <div className="payment__section">
          {/* payment section -- delivery address */}
          <div className="payment__title">
            <h3>delivery address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        <div className="payment__part2">
          {/* payment section -- review Items */}
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id + (Math.random() * 1000000).toFixed(0)}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className="payment__part2">
          {/* payment section -- payment method */}

          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* stripe magic will go here */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <p>
                        Order total ({basket.length} items):{' '}
                        <strong>{value}</strong>
                      </p>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />

                <button disabled={processing || disabled || succeeded}>
                    <span>{processing ? <p>Processing</p> : "Buy Now" }</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
