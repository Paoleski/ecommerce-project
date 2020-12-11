/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Component } from 'react';
import StarRateIcon from '@material-ui/icons/StarRate';
import { useHistory } from 'react-router-dom';
import '../styles/product.css';
import { useStateValue } from './StateProvider';
import AwesomeSlider from 'react-awesome-slider';
import awesomeCss from '../styles/awesome.css';
import { storage } from '../firebase';

// import customAwesome from '../styles/awesome.css'
// import AwesomeSliderStyles from 'react-awesome-slider/src/styled/fold-out-animation/fold-out-animation.scss'

function Product({ id, title, image, price, rating, description, weight, height, length, width }) {
  const [{ user, basket }, dispatch] = useStateValue();
  const [images, setImages] = useState('')
  const history = useHistory();

  useEffect(() => {
    image.forEach(img => {
      storage
    .ref(img.ref)
    .child(img.name)
    .getDownloadURL()
    .then((url) => setImages((prev) => [...prev, url]));
    })
  }, [image])

  const handleIsOpen = (e) => {
    dispatch({
      type: 'ADD_IMAGE',
      image: e.target.getAttribute('src'),
    });
    dispatch({
      type: 'SET_FULLSCREEN',
      fullscreen: true,
    });
  };

  const addToBasket = () => {
    if (user) {
      dispatch({
        type: 'ADD_TO_BASKET',
        item: {
          id: id,
          title: title,
          description:description,
          weight:weight,
          height:height,
          length:length,
          width:width,
          image: images[0],
          price: price,
          rating: rating,
        },
        user: user,
      });
    } else {
      history.push('/login');
    }
  };

  return (
    <div className="product">
      <div className="product__info">
        <h3 style={{ marginTop:-5, marginBottom:10}}>{title}</h3>
        <p>{description}</p>
        <p className="product__price">
          <small>$</small>
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
          {images &&
            images.map((image, index) => (
              <div key={index} onClick={handleIsOpen} data-src={image} />
            ))}
        </AwesomeSlider>
      </div>
      <button onClick={addToBasket}>add to basket</button>
    </div>
  );
}

export default Product;
