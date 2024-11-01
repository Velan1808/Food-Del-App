import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import {useNavigate} from "react-router-dom"

const PlaceOrder = () => {

  const {cartTotalAmount, token, URL, cartItems, food_list} = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
     firstname:"",
     lastname:"",
     email:"",
     street:"",
     city:"",
     state:"",
     pincode:"",
     country:"",
     phone:"",
  })

  const onChangeHandler = (e) =>{
    const name = e.target.name;
    const value =e.target.value;
    setData(data =>({...data,[name]:value}))
  }

  const placeOrder = async(e) => {
    e.preventDefault();
  
    // Add fallback checks for cartItems and food_list
    if (!cartItems || !food_list) {
      console.error('Cart items or food list is not defined');
      return;
    }
  
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
      return null;
    });

    try {
      // Process order items
      let orderData = {
        address: data,
        items: orderItems,
        amount: cartTotalAmount() + 50,
      };
      
      
      console.log(orderData);
      
       // Send request to place order
    let response = await axios.post(URL + "/api/order/place", orderData, {
      headers: { Authorization: `Bearer ${token}` }});
      
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  }

  useEffect(()=>{
    if(!token){
      navigate("/cart")
    }if(cartTotalAmount() === 0){
      navigate("/cart")
    }
    // eslint-disable-next-line
  },[token])

  return (
     <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
          <div className="place-order-title">
            <h2>Delivery Information</h2>
          </div>
          <div className="multi-fields">
            <input type="text" onChange={onChangeHandler} name='firstname' value={data.firstname} placeholder='First name' />
            <input type="text" onChange={onChangeHandler} name='lastname' value={data.lastname} placeholder='Last name' />
          </div>
          <input type="email" onChange={onChangeHandler} name='email' value={data.email}  placeholder='Email Address' />
          <input type="text" onChange={onChangeHandler} name='street' value={data.street}  placeholder='Street'/>
          <div className="multi-fields">
            <input type="text" onChange={onChangeHandler} name='city' value={data.city}  placeholder='City name' />
            <input type="text" onChange={onChangeHandler} name='pincode' value={data.pincode}  placeholder='Pin code' />
          </div>
          <div className="multi-fields">
            <input type="text" onChange={onChangeHandler} name='state' value={data.state}  placeholder='State name' />
            <input type="text" onChange={onChangeHandler} name='country' value={data.country}  placeholder='Country name' />
          </div>
          <input type="text" onChange={onChangeHandler} name='phone' value={data.phone}  placeholder='phone'/>
      </div>
      <div className='place-order-right'>
      <div className="cart-buttom">
          <div className="cart-buttom-left">
            <div className="title">
              <h2>Total Cart</h2>
            </div>
            <div className="cart-delivery-list">
              <p>Subtotal</p>
              <p>${cartTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-delivery-list">
              <p>Delivery fee</p>
              <p>${cartTotalAmount()===0 ? 0:49}</p>
            </div>
            <hr />
            <div className="cart-delivery-list">
              <p>Total</p>
              <p>${cartTotalAmount()===0 ? 0:cartTotalAmount() + 49}</p>
            </div>
            <button>PROCEED TO PAY</button>
        </div>
      </div>
      </div>
     </form>
  )
}

export default PlaceOrder