import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import '../styles/payment.css';
import CheckoutProduct from './CheckoutProduct';
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider';
import axios from '../utils/axios';
import { db } from '../firebase';

function Payment() {
  const [{ basket, user, profile }, dispatch] = useStateValue();

  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState('');
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);

  // useEffect(() => {
  //   const getClientSecret = async () => {
  //     const response = await axios({
  //       method: 'post',
  //       // strip expects the total in currencies subunits (use full cents 10$ === 10000)
  //       url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
  //     });
  //     setClientSecret(response.data.clientSecret);
  //   };

  //   getClientSecret();
  // }, [basket]);

  const handleSubmit = async (event) => {
    // fancy stripe stuff
    event.preventDefault();
    setProcessing(true);
    const response = await axios({
      method: 'post',
      // strip expects the total in currencies subunits (use full cents 10$ === 10000)
      url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
    });
    // eslint-disable-next-line no-unused-vars
    const payload = await stripe
      .confirmCardPayment(response.data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation
        db.collection('users')
          .doc(user?.uid)
          .collection('orders')
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          }).catch(error => console.log(error))

        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({
          type: 'EMPTY_BASKET',
        });

        history.replace('/orders');
      });
  };

  const handleChange = (event) => {
    // listen for changes in the cardElement and display errors as the customer type card details
    setError(event.error ? event.error.message : '');
    if (event.empty || !event.complete || !clientSecret) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        <div className="payment__section"></div>
        <div className="payment__part2">
          {/* payment section -- review Items */}
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id + (Math.random() * 10).toFixed(0)}
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
            {/* payment section -- delivery address */}
            <div className="payment__address__container">
              <h3>Delivery address</h3>
              <p>Address: {profile?.address}</p>
              <p>Zip code: {profile?.zipCode}</p>
              <p>
                {profile?.city}, {profile?.stateUF}
              </p>
            </div>
          </div>
          <div className="payment__details">
            {/* stripe magic will go here */}
            <form onSubmit={handleSubmit}>
              <div className="payment__cardElementContainer">
                <CardElement
                  onChange={handleChange}
                  options={cardElementOptions}
                />
                  {error && <div>{error}</div>}
              </div>

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
            
                <button className="payment__buyNowButton" disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const cardElementOptions = {
  // injecting css styles to card element(iframe)
  style: {
    base: {
      color: 'black',
      fontSize: '25px',
      '::placeholder': {
        color: 'black',
      },
    },
    complete: {
      color: 'green',
    },
  },
  hidePostalCode:true,
};
export default Payment;
