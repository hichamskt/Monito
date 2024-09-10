import React from 'react'
import "../styles/ProductsPage.css"
import Header from '../components/Header/Header'
import BreadCrumb from '../UI/BreadCrumb/BreadCrumb'
import AdoptionPoster from '../components/AdoptionPoster/AdoptionPoster'
import img1 from "../assets/prddog1.png"
import img2 from "../assets/prddog2.png"
import img3 from "../assets/prddog3.png"
import img4 from "../assets/prddog4.png"
import img5 from "../assets/prddog5.png"

const doginfo = {
    "SKU": "#1000078",
    "Breed": "Shiba Inu Sepia",
    "Price": "34.000.000 VND",
    "Gender": "Female",
    "Age": "2 Months",
    "Size": "Small",
    "Color": "Apricot & Tan",
    "Vaccinated": "Yes",
    "Dewormed": "Yes",
    "Cert": "Yes (MKA)",
    "Microchip": "Yes",
    "Location": "Vietnam",
    "Published Date": "12-Oct-2022",
    "imgs":[img1,img2,img3,img4,img5],
    "Additional Information": {
      "Breed Type": "Pure breed Shih Tzu",
      "Body Structure": "Good body structure",
      "Certification": "With MKA cert and Microchip",
      "Father Lineage": "Father from champion lineage"
    }
  }
  
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