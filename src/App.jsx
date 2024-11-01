import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './component/navbar/Navbar'
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import PlaceOrder from './pages/placeOrder/PlaceOrder';
import Footer from './component/footer/Footer';
import LoginPopup from './component/loginPopup/LoginPopup';
import { useState } from 'react';
import VerifyOrder from './pages/verifyOrder/VerifyOrder';
import MyOrder from './pages/myOrder/MyOrder'


function App() {

  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin = {setShowLogin} /> : <> </>}
      <div className="App">
        <Navbar setShowLogin = {setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />}/>
          <Route path='/order' element={<PlaceOrder />}/>
          <Route path='/verify' element={<VerifyOrder />}/>
          <Route path='/myorders' element={<MyOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
