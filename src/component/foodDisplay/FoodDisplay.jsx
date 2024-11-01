import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../foodItem/FoodItem'

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)

  return (
    <div className='food-display'>
        <h2 className="food-display-heading">
             Top dishes near you
        </h2>
        <div className="food-display-list">
        {/* eslint-disable-next-line */}
        {food_list.map((item) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem 
                key={item._id}  
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          return null;  // Return null for items that do not match the category filter
        })}
      </div>
    </div>
  )
}

export default FoodDisplay