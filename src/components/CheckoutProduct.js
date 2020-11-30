import React, { forwardRef } from 'react'
import '../styles/checkoutproduct.css'
import StarRateIcon from '@material-ui/icons/StarRate'
import { useStateValue } from './StateProvider'

const CheckoutProduct = forwardRef((props, ref) => {
    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = useStateValue()

    const removeFromBasket = () => {
        dispatch({
            type:'REMOVE_FROM_BASKET',
            id:props.id,
  // eslint-disable-next-line no-unused-vars
        })
    }
    return (
        <div ref={ref} className="checkoutProduct">
            <img className="checkoutProduct__image" src={props.image} alt=""/>
            <div className='checkoutProduct__info'>
                <p className="checkoutProduct__title">{props.title}</p>
                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{props.price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {Array(props.rating).fill().map((_, i) => <StarRateIcon key={i}/>)}
                </div>

                <button className="checkoutProduct__button" onClick={removeFromBasket}>remove from basket</button>
            </div>
        </div>
    )
})

export default CheckoutProduct
