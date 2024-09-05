import React, { useState } from 'react'
import "../styles/CategoryPage.css"
import Header from '../components/Header/Header'
import Category from '../components/Category/Category'

import img1 from "../assets/dogcat1.png"
import img2 from "../assets/dogcat2.png"
import img3 from "../assets/dogcat3.png"
import img4 from "../assets/dogcat4.png"
import img5 from "../assets/dogcat5.png"
import img6 from "../assets/dogcat6.png"
import img7 from "../assets/dogcat7.png"
import img8 from "../assets/dogcat8.png"
import CategoryDogPoster from '../components/CategoryDogPoster/CategoryDogPoster'
import BreadCrumb from '../UI/BreadCrumb/BreadCrumb'
import Footer from '../components/Footer/Footer'


const dummyDogData = [
  {
  dogimg:img1,
  disc:"Small Dogs"
},
  {
  dogimg:img2,
  disc:"Airedale"
},
  {
  dogimg:img3,
  disc:"Akita"
},
  {
  dogimg:img4,
  disc:"Australian Shepherd"
},
  {
  dogimg:img5,
  disc:"Beagle"
},
  {
  dogimg:img6,
  disc:"Rottweiler"
},
  {
  dogimg:img7,
  disc:"Labrador"
},
  {
  dogimg:img8,
  disc:"Husky"
},
]

function CategoryPage() {
const [showCategory,setShowCategory]=useState(false);

  return (
    <div className='container'>
<Header></Header> 
{ showCategory &&  <Category></Category>}
<div className='dogCategorySection'>
  <BreadCrumb tring="Category Dogs"></BreadCrumb>
  <CategoryDogPoster></CategoryDogPoster>
  <div className='categoriesCardsGroup'>

  </div>
</div>
<Footer></Footer>
    </div>
  )
}

export default CategoryPage