/* eslint-disable no-unused-vars */
import React, { useState, Component } from 'react';
import StarRateIcon from '@material-ui/icons/StarRate';
import {  useHistory } from 'react-router-dom';
import '../styles/product.css';
import { useStateValue } from './StateProvider';
import AwesomeSlider from 'react-awesome-slider';
import awesomeCss from '../styles/awesome.css'

// import customAwesome from '../styles/awesome.css'
// import AwesomeSliderStyles from 'react-awesome-slider/src/styled/fold-out-animation/fold-out-animation.scss'



function Product({ id, title, image, price, rating }) {
  const [{ user, basket }, dispatch] = useStateValue();
  const history = useHistory()

  const handleIsOpen = () => {
    dispatch({
      type:'ADD_IMAGE',
      image:image[0]
    })
    dispatch({
      type:'SET_FULLSCREEN',
      fullscreen:true
    })
  }

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
      <div className="product__image">
        <AwesomeSlider cssModule={awesomeCss} bullets={false}>
          {image.map(image => <div onClick={handleIsOpen} data-src={image}/>)}
        </AwesomeSlider>
      </div>
      <button onClick={addToBasket}>add to basket</button>
    </div>
  );
}

export default Product;
