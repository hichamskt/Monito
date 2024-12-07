import React from 'react'
import "../ProductCard/ProductCard.css"
import { useAppContext } from '../../AppContex';
function ProductCard({ imag ,
    desc, 
    gene,
    age,
    prix}) {

      const { currency ,  rate } = useAppContext();

      const convertPrice = (price) => {
    
        return (price * rate).toFixed(2); 
      };
      

      
      const calculateAge = (birthDate) => {
        const birth = new Date(birthDate);
        const today = new Date();
      
       
        const yearDiff = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        const dayDiff = today.getDate() - birth.getDate();
      
       
        if (yearDiff === 0) {
          let months = monthDiff;
          if (dayDiff < 0) {
            months--; 
          }
          return months > 0 ? `${months} months` : `Less than 1 month`;
        }
      
      
        let age = yearDiff;
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          age--; 
        }
      
        return `${age} years`;
      };

      

  return (
    <div className='ProductCard'>
        <img className='dogimg' src={`http://localhost:5000/${imag[0]?.url}`} alt='dog'></img>
        <h3>{desc}</h3>
        <div className='productageInfo'>
            <p>Gene:&nbsp; <span>{gene}</span></p>
            <p>Age:&nbsp; <span>{calculateAge(age)}</span> </p>
        </div>
        <h3>{convertPrice(prix)}<span>&nbsp;{currency}</span></h3>
    </div>
  )
}

export default ProductCard