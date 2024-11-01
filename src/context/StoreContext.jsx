import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const StoreContext=createContext(null);

const StoreContextProvider = (props) =>{

    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFood_list] = useState([]);

    const URL = "https://mern-food-del-5h6c.onrender.com"


// fetch the food list data
    const fetchFood_list = async() =>{
        const response = await axios.get(URL+"/api/food/list")
        if(response.data.success){
            setFood_list(response.data.data)
        }
      }

// fetch the cartData
      const getCartData = async(token) =>{
        const response = await axios.get(`${URL}/api/cart/get`,{ headers: { Authorization: `Bearer ${token}` }})
        setCartItems(response.data.cartData)
    } 

    useEffect(()=>{
        async function loadData() {
            await fetchFood_list();

            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))   
                await getCartData(localStorage.getItem("token"))
            }
        }
        
        loadData();
        // eslint-disable-next-line 
    },[])

    //add the  cartData
    const addToCart = async(itemId) =>{
        if(!cartItems[itemId]) {
            setCartItems((prev) =>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev) =>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(`${URL}/api/cart/add`,{itemId}, { headers: { Authorization: `Bearer ${token}`}})
        }
    }

    //remove the cartData
    const removeToCart = async(itemId) =>{
        setCartItems((prev) =>({...prev,[itemId]:prev[itemId]-1}))
        
        if(token){
          await axios.post(`${URL}/api/cart/remove`,{itemId}, { headers: { Authorization: `Bearer ${token}`}})
        }
    }

    
  //total amount of the cartItems
    const cartTotalAmount = () =>{
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
            let itemInfo = food_list.find((product) => product._id=== item);
             /*  eslint-disable-next-line */
            totalAmount += itemInfo.price * cartItems[item];
            }
        }
     return totalAmount;
    }

    const contextValue ={
         food_list ,
         cartItems,
         setCartItems,
         addToCart,
         removeToCart ,
         cartTotalAmount,
         token,
         setToken,
         URL
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider
