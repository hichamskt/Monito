import React, { useEffect, useState } from 'react'
import "../styles/ProductsPage.css"
import Header from '../components/Header/Header'
import BreadCrumb from '../UI/BreadCrumb/BreadCrumb'
import AdoptionPoster from '../components/AdoptionPoster/AdoptionPoster'
import Cart from '../components/Cart/Cart'
import ShopIcone from '../UI/ShopIcone/ShopIcone'
import { useAppContext } from '../AppContex'
import { FaFilter } from "react-icons/fa6";
import emptybox from "../assets/empty-box.png"
import axiosInstance from '../axios/axiosInstance'
import { Link } from 'react-router-dom'
import DogProductCard from '../components/DogProductCard/DogProductCard'

function ProductsPage() {

  const { setShowCard ,showCard } = useAppContext();



  const [productData,setProductData]= useState([]);
  const [filtredData,setFiltredData]= useState([]);
  const [loading,setLoading]= useState(true);


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/product/getallproducts");
        setProductData(response.data);
        setFiltredData(response.data);
      } catch (err) {
        console.log(err)
      } finally{
        setLoading(false);
      }
    };
    
    fetchData();

  }, []);

  console.log('product data:',productData)

  return (
    <div className='container'>
        <Header></Header>
        {showCard && <Cart/>}
      {showCard && <div className='overlay-black'></div>}
      <ShopIcone/>
        <div className='productspage'>
            <BreadCrumb tring="Category dogs Products"></BreadCrumb>
            <AdoptionPoster></AdoptionPoster>

            <div className='productspart'>
      <ProductFilter  setFiltredData={setFiltredData} productData={productData} />
      <Products productData={filtredData} />

      </div>

        </div>
        </div>
  )
}

export default ProductsPage



function ProductFilter ({setFiltredData,productData} ){

const [selectedCategory,setSelectedCategory]=useState([]);
const [priceRange, setPriceRange] = useState({ min: '', max: '' });
const [showFilter,setShowFilter]=useState(true);

  const catigories = ["Food","Cats Food","Dogs Food","Toy"]


  useEffect(() => {
    const filtered = productData?.filter((item) => {
      const matchesCategories =
        selectedCategory.length === 0 || selectedCategory.includes(item.productCategory);
  
      const matchesPrice =
        (priceRange.min === "" || item.sellingPrice >= priceRange.min) &&
        (priceRange.max === "" || item.sellingPrice <= priceRange.max);
  
      return matchesCategories && matchesPrice ;
    });
  
    setFiltredData(filtered);
  }, [selectedCategory, priceRange ]);
  
  

  const hundleCategoryChange = (e)=>{
    const { value, checked } = e.target;
  
                setSelectedCategory((prev) =>
                  checked ? [...prev, value] : prev.filter((productCategory) => productCategory !== value)
                );
  }


  
  return(
    <div className='productFilter'>
        
      <div className='filtertop'>
        <p className='filter'>Filters</p>
        <FaFilter onClick={()=>setShowFilter(!showFilter)}></FaFilter>
        </div>
     {showFilter && <div className='filtesBox'>
        <div className='filtertype'>
          <p>Type</p>
          {catigories.map((type)=>(
             <label key={type}>
             <input
               type="checkbox"
               name={type}
               value={type}
               onChange={(e) => hundleCategoryChange(e)}
             />
             {type}
           </label>
          ))}
        </div>
        
      <div className="filterprice">
        <p>Price</p>
        <div className='pricefilterinputs'>
        <input type="number" min={0} placeholder="Min"  value={priceRange.min}
            onChange={(e) =>
              setPriceRange((prev) => ({ ...prev, min: e.target.value }))
            }></input>
        <input type="number" min={0} placeholder="Max"  value={priceRange.max}
            onChange={(e) =>
              setPriceRange((prev) => ({ ...prev, max: e.target.value }))
            } ></input>
            </div>
      </div>

      </div>}
    </div>
  )
}

function Products ({productData}){
  return(
    <div className='productsSide'>
      <p className='ourproduct'>Our Products</p>
      <div className='AllProducts'>
        {
          productData?.length > 0 ?  productData.map((item, index)=>(
            <Link to={`/Products/product/${item.id}`} key={index} style={{ textDecoration: "none"}}>
            <DogProductCard
              imag={item.images}
              desc={item.porductName}
              prix={item.sellingPrice}
              product={item.productCategory}
              size={item.size}
              sizeUnit={item.sizeUnit}
              key={index}
            ></DogProductCard>
            
            </Link>
            
          )): <div className='nodata-prd'>
            <img src={emptybox} alt='imgdata' />
            <p>No Products Were Found</p>
          </div>
        }
      </div>
    </div>
  )
}