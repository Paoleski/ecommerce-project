import React, { forwardRef } from 'react';
import '../styles/checkoutproduct.css';
import StarRateIcon from '@material-ui/icons/StarRate';
import { useStateValue } from './StateProvider';

const CheckoutProduct = forwardRef((props, ref) => {
  // eslint-disable-next-line no-unused-vars
  const [{ user }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: props.id,
      user: user,
      // eslint-disable-next-line no-unused-vars
    });
  };

  return (
    <div ref={ref} className="checkoutProduct">
      <img className="checkoutProduct__image" src={props.image} alt=""></img>
      <div className="checkoutProduct__infoContainer">
        <div className="checkoutProduct__info">
          <p className="checkoutProduct__title">{props.title}</p>
          <p>{props.description}</p>
          <p className="checkoutProduct__price">
            <small>$</small>
            <strong>{props.price}</strong>
          </p>
          <div className="checkoutProduct__rating">
            {Array(props.rating)
              .fill()
              .map((_, i) => (
                <StarRateIcon key={i} />
              ))}
          </div>
          {!props.hideButton && (
            <button
              className="checkoutProduct__button"
              onClick={removeFromBasket}
            >
              remove from basket
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

export default CheckoutProduct;
