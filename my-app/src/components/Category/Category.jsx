import React from 'react'
import "../Category/Category.css"
import categ1 from "../../assets/doggroupe.png"
import categ2 from "../../assets/catsgroup.png"
import categ3 from "../../assets/dogfood.png"
import categ4 from "../../assets/catfood.png"
import categ5 from "../../assets/dogproducts.png"
import categ6 from "../../assets/catsproduct.png"
import Footer from "../Footer/Footer.jsx"

const dummyCtegorydata = [
    {
        categoryimg:categ1,
        category:"Dogs"
    },
    {
        categoryimg:categ2,
        category:"Cats"
    },
    {
        categoryimg:categ3,
        category:"Dogs Food"
    },
    {
        categoryimg:categ4,
        category:"Cats Food"
    },
    {
        categoryimg:categ5,
        category:"Dogs Products"
    },
    {
        categoryimg:categ6,
        category:"Cats Products"
    },
]



function Category() {
  return (
    <div className='category'>
    <h2>Category</h2>
    <div className='categories'>

        {
            dummyCtegorydata.map((item,index)=>(
                <div key={index} className='category-card'>
                    <img src={item.categoryimg} alt="category" />
                    <h3>{item.category}</h3>           
                     </div>
            ))
        }
        </div>
     
    </div>
  )
}

export default Category