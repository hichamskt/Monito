import React from 'react'
import '../ShopIcone/ShopIcon.css'
import { FaShoppingCart } from "react-icons/fa";
import { useAppContext } from '../../AppContex';

function ShopIcone() {
  const { setShowCard } = useAppContext();

  return (
    <div className='shopicc' role='button' onClick={()=>setShowCard(true)}>
        <FaShoppingCart/>
    </div>
  )
}

export default ShopIcone