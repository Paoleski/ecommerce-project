import React, { useState, useEffect } from 'react';
import '../styles/shipping.css';
import { useStateValue } from './StateProvider';
import { getRate } from '../utils/shippingAxios';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

const Shipping = () => {
  // eslint-disable-next-line no-unused-vars
  const [{ profile, user, basket }, dispatch] = useStateValue();
  const [rate, setRate] = useState(null);
  const [items, setItems] = useState([]);
  const [shippingError, setShippingError] = useState(false);
  const [loaderIcon, setLoaderIcon] = useState('');

  const getShipmentObject = () => {
    const shipmentObject = {
      origin_postal_code: '97035',
      origin_city: 'Portland',
      origin_state: 'OR',
      destination_city: profile.city,
      destination_state: profile.stateUF,
      destination_country_alpha2: 'US',
      destination_postal_code: profile.zipCode,
      taxes_duties_paid_by: 'Receiver',
      is_insured: false,
      apply_shipping_rules: false,
      items: items,
    };
    console.log(shipmentObject);

    return shipmentObject;
  };

  useEffect(() => {
    setItems([])
    if (basket) {
      basket.forEach((item) => {
        const itemObj = {
          actual_weight: item.weight,
          height: item.height,
          width: item.width,
          length: item.length,
          category: 'bags_luggages',
          declared_currency: 'USD',
          declared_customs_value: 10,
        };
        setItems((prev) => [...prev, itemObj]);
      });
    }
  }, [basket]);

  const getRateOfObject = async () => {
    setLoaderIcon(
      <Loader type="ThreeDots" color="#ff914d" height={40} width={40} />
    );

    const response = await getRate(getShipmentObject());

    if (response.rates.length > 0) {
      setRate(response.rates);
      return;
    }
    setShippingError(response.messages[0])
  };

  const selectRate = (event) => {
    dispatch({
      type: 'SET_SHIPPINGRATE',
      shippingRate: event.target.value,
    });
  };


  return (
    <div className="shipping">
      <h3>Shipping</h3>
      <button onClick={getRateOfObject}>Click to get shipping rates</button>
      <div onChange={selectRate} className="shipping__rates">
        {rate
          ? rate.map((rating, index) => {
              return (
                <div key={index} className="shipping__rating__container">
                  <input
                    type="radio"
                    value={rating.total_charge}
                    name="rating"
                  />
                  {rating.total_charge} {rating.full_description}
                </div>
              );
            })
          : loaderIcon}
          {shippingError && <p style={{padding:5}}>{shippingError}</p>}
      </div>
    </div>
  );
};

export default Shipping;
