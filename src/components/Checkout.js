import React from 'react';
import '../styles/checkout.css';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import FlipMove from 'react-flip-move'
import Subtotal from './Subtotal';

function Checkout() {
  // eslint-disable-next-line no-unused-vars
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    
      <div className="checkout">
        <div className="checkout__left">
            <div>
              <h3>Hello, {user?.email}</h3>
              <h2 className="checkout__title">Your shopping basket </h2>
                {basket.map((item) => (
                    <CheckoutProduct
                      key={item.id + (Math.random() * 1000000).toFixed(0)}
                      id={item.id}
                      title={item.title}
                      image={item.image}
                      rating={item.rating}
                      price={item.price}
                    />
                  ))}
            </div>
        </div>
        <div className="checkout__right">
          <Subtotal />
        </div>
      </div>
  
  );
}

export default Checkout;
