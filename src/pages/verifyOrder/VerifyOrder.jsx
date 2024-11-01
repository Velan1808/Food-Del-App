import React, { useContext, useEffect } from 'react'
import "./VerifyOrder.css"
import {useNavigate, useSearchParams} from "react-router-dom"
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const VerifyOrder = () => {
// eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const {URL, token, setToken} = useContext(StoreContext);
    const navigate = useNavigate();


    const verifyUserOrder = async () => {
      // First, retrieve the token asynchronously (if applicable)
      const token1 = localStorage.getItem("token");  // Ensure token is retrieved before sending request
      setToken(token1);
    
      if (token1) {
        // Send the request only after the token is available
        const response = await axios.post(`${URL}/api/order/verify`,{success, orderId}, {
          headers: { Authorization: token }});

          if (response.data.success) {
            navigate("/myorders");
          }  
          else{
            navigate("/")
          }
          }
      }

    
    // Example use in a React effect
    useEffect(() => {

      async function verifyData() {
        await verifyUserOrder();
      }
      verifyData();
      // eslint-disable-next-line
    }, []);
      
        
      
      

   
  return (
    <div className='verify'>
        <div className="spinner"></div>
    </div>
  )
}

export default VerifyOrder