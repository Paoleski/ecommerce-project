import React, { useState } from 'react';
import '../styles/shipping.css';
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider';
import { getRate } from '../utils/shippingAxios';

const Shipping = () => {
  const [{ profile, user, orders }, dispatch] = useStateValue();
  const [rate, setRate] = useState(null);

  const shipmentObject = {
    origin_postal_code: '97035',
    origin_city:'Portland',
    origin_state:'OR',
    destination_city:'Montreal',
    destination_state:'QC',
    destination_country_alpha2: 'CA',
    destination_postal_code: 'J7A 3T2',
    taxes_duties_paid_by: 'Receiver',
    is_insured: false,
    apply_shipping_rules: false,
    items: [
      {
        actual_weight: 1.2,
        height: 10,
        width: 15,
        length: 20,
        category: 'bags_luggages',
        declared_currency: 'USD',
        declared_customs_value: 100,
      },
    ],
  };

  const getRateOfObject = async () => {
    const response = await getRate(shipmentObject);
    console.log(response)
    console.log(response.rates);
    setRate(response.rates);
  };

  return (
    <div className="shipping">
      <h3>Shipping</h3>
      <button onClick={getRateOfObject}>Click to get shipping rates</button>
      {rate &&
        rate.map((i) => {
          return (
            <div className="shipping__rates">
              <input type="checkbox"/>
              <p key={i.courier_id}>
                {i.full_description} ${i.total_charge}
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default Shipping;
