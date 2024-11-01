import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'


const Navbar = ({setShowLogin}) => {
  const [menu, setMenu]=useState('home');
  const {cartTotalAmount, token, setToken} = useContext(StoreContext);
  const navigate = useNavigate();

  const Logout = () =>{
    localStorage.removeItem("token");
    setToken('')
    navigate("/")
  }
  return (
    <div className='navbar'>
        <Link to={'/'} > <img src={assets.logo} alt="" className="logo" /> </Link>
        <ul className="navbar-menu">
          <Link to={'/'} onClick={()=>setMenu('home')} className={menu==="home" ? "active" : ""}>home</Link>
          <a href='#explore-menu' onClick ={()=>setMenu('menu')} className={menu==="menu" ? "active" : ""}>menu</a>
          <a href='#app-download' onClick ={()=>setMenu('mobile-app')} className={menu==="mobile-app" ? "active" : ""}>mobile-app</a>
          <a href='#footer' onClick ={()=>setMenu('contact-us')} className={menu==="contact-us" ? "active" : ""}>contact-us</a>
        </ul>
        <div className="navbar-right">
          <img src={assets.search_icon} alt="" className="search-icon" />
          <div className="navbar-search-icon">
           <Link to={'/cart'} ><img src={assets.basket_icon} alt="" /></Link> 
            <div className={cartTotalAmount()>0 ? "dot" : ""}></div>
          </div>

          {!token ? <button onClick={() =>setShowLogin(true)}> sign in</button>
           : <div className='navbar-profile'>
               <img src={assets.profile_icon} alt="" />
               <ul className="navbar-profie-dropdown">
                 <li className='navbarlist'><Link to={"/myorders"}><img src={assets.bag_icon} alt="" /><span>Orders</span></Link> </li>
                 <hr />
                 <li className='navbarlist' onClick={Logout}><img src={assets.logout_icon} alt="" /><span>LogOut</span></li>
               </ul>
            </div>}
          
        </div>
    </div>
  )
}

export default Navbar