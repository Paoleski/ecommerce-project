import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import '../styles/payment.css';
import CheckoutProduct from './CheckoutProduct';
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider';
import axios from '../utils/axios';
import { db } from '../firebase';
import Shipping from './Shipping';

function Payment() {
  const [{ basket, user, profile, shippingRate }, dispatch] = useStateValue();

  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState('');
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event) => {
    // fancy stripe stuff
    event.preventDefault();
    const billingDetails = {
      name: profile?.fullName,
      email: user?.email,
      address: {
        city: profile?.city,
        country:'US',
        line1: profile?.street,
        state: profile?.stateUF,
        postal_code: profile?.zipCode,
      },
    };
    setProcessing(true);

    const { data: clientSecret } = await axios.post('/payments/create', {
      amount: (getBasketTotal(basket) + Number(shippingRate)) * 100,
    });
      const paymentMethodReq = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: billingDetails,
    }) 

    console.log(paymentMethodReq)
    
    const payload = await stripe.confirmCardPayment(clientSecret.clientSecret, {
      payment_method: paymentMethodReq.paymentMethod.id,
    });
    console.log(payload)
  
    if (payload.error) {
      alert(`${payload.error.message}`)
      return window.location.reload()
    }

    db
      .collection('orders')
      .doc(payload.paymentIntent.id)
      .set({
        user:user.uid,
        basket: basket,
        amount: payload.paymentIntent.amount,
        shippingRate:shippingRate,
        created: payload.paymentIntent.created,
        billingDetails:billingDetails
      });

    setSucceeded(true);
    setError('');
    setProcessing(false);

    dispatch({
      type: 'EMPTY_BASKET',
      user: user,
    });

    if (payload.paymentIntent.status === 'succeeded') {
      console.log('sucess');
      history.replace('/orders');
    } else {
      alert('payment failed');
      history.replace('/payment');
    }
  };

  const handleChange = (event) => {
    // listen for changes in the cardElement and display errors as the customer type card details
    setError(event.error ? event.error.message : '');
    if (event.empty || !event.complete || !shippingRate) {
      setDisabled(true);
    } else {
      setDisabled(false);
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

          <div className="payment__items">
            <h3>Review items and delivery</h3>
            {basket.map((item) => (
              <CheckoutProduct
                key={(Math.random() * 10000).toFixed(0)}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className="payment__paymentMethod">
          {/* payment section -- payment method */}

          <div className="payment__title">
            <h3>Payment Method</h3>
            {/* payment section -- delivery address */}
            <div className="payment__stripeSecurity">
              <h3>Stripe payment:</h3>
              <p>
                "Anyone involved with the processing, transmission, or storage
                of card data must comply with the Payment Card Industry Data
                Security Standards (PCI DSS). Stripe has been audited by an
                independent PCI Qualified Security Assessor (QSA) and is
                certified as a PCI Level 1 Service Provider. This is the most
                stringent level of certification available in the payments
                industry."
              </p>
              <p>Stripe forces HTTPS for all services using TLS (SSL).</p>
              <p>
                Learn more
                <a href="https://stripe.com/docs/security">
                  {' '}
                  stripe's documentation
                </a>
              </p>
            </div>
          </div>

          <div className="payment__details">
            <div className="payment__address__container">
              <h3>Delivery address</h3>
              <p>Address: {profile?.street}</p>
              <p>Zip code: {profile?.zipCode}</p>
              <p>
                {profile?.city}, {profile?.stateUF}
              </p>
            </div>

            <Shipping/>
            {/* stripe magic will go here */}
            {shippingRate && 
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
                       {value} (shipping cost: {shippingRate})
                      </p>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket) + Number(shippingRate)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />

                <button
                  className="payment__buyNowButton"
                  disabled={processing || disabled || succeeded}
                >
                  <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                </button>
              </div>
            </form>
            }
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
      fontSize: '20px',
      '::placeholder': {
        color: 'black',
      },
    },
    invalid: {
      iconColor: 'red',
    },
    complete: {
      color: 'green',
      iconColor: 'green',
    },
  },
  hidePostalCode: true,
};
export default Payment;
