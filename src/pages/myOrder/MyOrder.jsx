import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { assets } from '../../assets/assets'
import './MyOrder.css'

const MyOrder = () => {

  const {URL} = useContext(StoreContext);
  const [data, setData] = useState([]);

  useEffect(() => {
 
    async function fetchUserOrder() {
     await fetchOrders();
    }
    fetchUserOrder();
    // eslint-disable-next-line
  }, []);

  const fetchOrders = async() =>{
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.post(`${URL}/api/order/userOrder`, {}, { headers: { Authorization: `Bearer ${token}` } });

      if (response.data.success) {
          setData(response.data.data); // Handle successful response
      } else {
          console.error(response.data.message);
      }
  } catch (error) {
      console.error('Error fetching orders:', error);
  }
    }

 
  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
           {data.map((order, index) =>{
            return(
              <div key={index} className="my-orders-order">
                <img src={assets.parcel_icon} alt="" />
                <div>
                  {order.items.map((item, index) =>{
                      if(index === order.items.length-1) {
                        return <p key={index}>{`${item.name} x ${item.quantity}`}</p>
                      }else{
                        return <p key={index}>{`${item.name} x ${item.quantity} ,`}</p>
                      }
                    })}
                </div>
                <p>${order.amount}.00</p>
                <p>Items: {order.items.length}</p>
                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                <button>Track Order</button>
              </div>
            )
           })}
        </div>
    </div>
  )
}

export default MyOrder