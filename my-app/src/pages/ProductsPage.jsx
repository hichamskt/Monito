import React from 'react'
import "../styles/ProductsPage.css"
import Header from '../components/Header/Header'
import BreadCrumb from '../UI/BreadCrumb/BreadCrumb'
import AdoptionPoster from '../components/AdoptionPoster/AdoptionPoster'
import Cart from '../components/Cart/Cart'
import ShopIcone from '../UI/ShopIcone/ShopIcone'
import { useAppContext } from '../AppContex'
function ProductsPage() {

  const { setShowCard ,showCard } = useAppContext();

  return (
    <div className='container'>
        <Header></Header>
        {showCard && <Cart/>}
      {showCard && <div className='overlay-black'></div>}
      <ShopIcone/>
        <div className='productspage'>
            <BreadCrumb tring="Category dogs Products"></BreadCrumb>
            <AdoptionPoster></AdoptionPoster>

        </div>
        </div>
  )
}

export default ProductsPage