import React, { useState } from 'react'
import Header from '../../component/header/Header'
import ExploreMenu from '../../component/exploremenu/ExploreMenu'
import FoodDisplay from '../../component/foodDisplay/FoodDisplay'
import AppDownload from '../../component/appdownload/AppDownload'

const Home = () => {
  const [category, setCategory] = useState("All")
  return (
    <div className='home'>
      <Header />
      
      <ExploreMenu 
          category ={category}
          setCategory ={setCategory}
      />

      <FoodDisplay
          category ={category}
          setCategory ={setCategory}
     />

       <AppDownload />
    </div>
  )
}

export default Home