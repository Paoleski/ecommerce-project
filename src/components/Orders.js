import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import '../styles/orders.css'
import Order from './Order'
import { useStateValue } from './StateProvider'

function Orders() {
    // eslint-disable-next-line no-unused-vars
    const [{basket, user}, dispatch] = useStateValue()
    const [orders, setOrders] = useState([])

    useEffect(() => {
        if (user) {
                db
                .collection('orders')
                .where("user", "==", user.uid)
                .orderBy('created', 'desc')
                .onSnapshot(snapshot => {
                    setOrders(snapshot.docs.map(doc => ({
                        id:doc.id,
                        data:doc.data()
                    })))
                    dispatch({
                        type:'SET_ORDERS',
                        orders:orders
                    })
                })
            } else {
                setOrders([])
            } 
            }, [])
    
    return (
        <div className='orders'>
            <h1>Your orders</h1>

            <div className="orders__order">
                {orders?.map(order => (
                    <Order key={order.data.created} order={order}/>
                ))}
            </div>
        </div>
    )
}

export default Orders
