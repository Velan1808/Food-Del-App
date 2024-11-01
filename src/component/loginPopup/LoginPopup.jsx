import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginPopup = ({setShowLogin}) => {

   const [currentState, setCurrentState] = useState("Login")
   const {URL, setToken} = useContext(StoreContext)

   const [data, setData] = useState({
    name:"",
    email:"",
    password:""
   });

   const onChangeHandler = (e) =>{
     const name = e.target.name;
     const value =e.target.value;
     setData(data =>({...data,[name]:value}))
   }
   

   const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let newURL = URL;
      let response;
  
      if (currentState === "Login") {
        newURL += "/api/user/login";
        response = await axios.post(newURL, data);
      } else {
        newURL += "/api/user/register";
        response = await axios.post(newURL, data);
      }
  
      // Check if response was successful
      if (response.data.success) {
        if (currentState === "Login") {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        }
        setShowLogin(false);
      } else {
        // Handle unsuccessful responses here
        console.error("API response was not successful:", response.data.message);
        alert(response.data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      // Detailed error logging
      console.error("Error during API request:", err.response ? err.response.data : err.message);
      alert(err.response ? err.response.data.message : "An error occurred. Please try again.");
    }
  };
  

  return (
    <div className='login-popup'>
      <form className='login-popup-container' onSubmit={onSubmitHandler}>
        <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img onClick={() =>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currentState==="Login" ? <></> : <input type="text" name='name' value={data.name} onChange={onChangeHandler} placeholder='Your name' required/>}
            <input type="email" name='email'  value={data.email} onChange={onChangeHandler} placeholder='Your email' required/>
            <input type="password" name='password' value={data.password} onChange={onChangeHandler} placeholder='Password' required/>
        </div>
        <button type='submit' onClick={onSubmitHandler}>{currentState==="Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
          {currentState==="Login" 
          ? <p>Create a new account <span onClick={() =>setCurrentState("Sign Up")}>Click here</span></p>
          : <p>Already have an account <span onClick={() =>setCurrentState("Login")}>Login here</span></p>}
       
      </form>
    </div>
  )
}

export default LoginPopup