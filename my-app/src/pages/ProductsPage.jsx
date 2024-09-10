import React from 'react'
import "../styles/ProductsPage.css"
import Header from '../components/Header/Header'
import BreadCrumb from '../UI/BreadCrumb/BreadCrumb'
import AdoptionPoster from '../components/AdoptionPoster/AdoptionPoster'

function ProductsPage() {
  return (
    <div className='container'>
        <Header></Header>
        <div className='productspage'>
            <BreadCrumb tring="Category dogs Products"></BreadCrumb>
            <AdoptionPoster></AdoptionPoster>

        </div>
        </div>
  )
}

export default ProductsPage