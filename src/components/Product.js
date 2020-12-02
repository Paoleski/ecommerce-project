/* eslint-disable no-unused-vars */
import React from 'react';
import StarRateIcon from '@material-ui/icons/StarRate';
import {  useHistory } from 'react-router-dom';
import '../styles/product.css';
import { useStateValue } from './StateProvider';
import { db } from '../firebase';

function Product({ id, title, image, price, rating }) {
  const [{ user, basket }, dispatch] = useStateValue();
  const history = useHistory()

  const addToBasket = () => {
    if (user) {
        dispatch({
        type: 'ADD_TO_BASKET',
        item: {
            id: id,
            title: title,
            image: image,
            price: price,
            rating: rating,
        },
        user:user,
        })
    } else {
        history.push('/login')
    }
  };

  console.log(basket)
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>R$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarRateIcon key={i} />
            ))}
        </div>
      </div>

      <img src={image} alt="" />
      <button onClick={addToBasket}>add to basket</button>
    </div>
  );
}

export default Product;
