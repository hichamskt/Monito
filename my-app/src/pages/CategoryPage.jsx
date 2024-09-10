import React, { useState } from 'react'
import "../styles/CategoryPage.css"
import Header from '../components/Header/Header'
import Category from '../components/Category/Category'
function CategoryPage() {
const[showCategory,setShowCategory]=useState(true);

  return (
    <div className='container'>
<Header></Header>
{<Category></Category>}
    </div>
  )
}

export default CategoryPage