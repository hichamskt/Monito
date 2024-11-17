import React, { useState , useEffect} from 'react'
import Header from '../components/Header/Header'
import '../styles/ProductPage.css'
import { useParams } from "react-router-dom";
import axiosInstance from "../axios/axiosInstance";
import ShopIcone from '../UI/ShopIcone/ShopIcone';
import Cart from '../components/Cart/Cart';
import { useAppContext } from '../AppContex';

function ProductPage() {
  const { setShowCard ,showCard ,items , setItems } = useAppContext();

  const [quant,setquant]=useState(1);
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState();
  const { productid } = useParams();


  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await axiosInstance.get(`/product/getproductbyid/${id}`);
        setProductData(response.data.product);
      } catch (err) {
        console.log(err);
      } finally {
      setLoading(false);
    }
    };

    fetchData(productid);

  }, [productid]);

  const hundleAddToCard = (newItem) => {
    setItems((prevItems) => {
      const exists = prevItems.find((item) => item.productSku === newItem.productSku);
      if (exists) {
        
        return prevItems.map((item) =>
          item.productSku === newItem.productSku
            ? { ...item, qnt: item.qnt + newItem.qnt }
            : item
        );
      } else {
        
        return [...prevItems, newItem];
      }
    });
    setShowCard(true);
  };
  
  return (
    <div className="container">
      {showCard && <Cart/>}
      {showCard && <div className='overlay-black'></div>}
        <Header></Header>
        <ShopIcone />
       { !loading && <div className='productitem'>
         <img src={`http://localhost:5000/${productData.images[0]?.url}`}alt='produit' className='prdctimage'></img>   
        <div className='producttext'>
        <h4>{productData.productSku}</h4>
        <h2>{productData.porductName}</h2>
        <h3>{productData.sellingPrice}DH</h3>
        <div className='qntAddToCard'>
          <div className='quantt'>
          <button disabled={quant <= 1}  onClick={() => setquant(quant - 1)}>-</button>
            <span>{quant}</span>
            <button onClick={()=>setquant(quant+1)}>+</button>
          </div>
          <button className='addtocard'  onClick={()=> hundleAddToCard({
            productSku:productData.productSku,
            url:productData.images[0]?.url,
            porductName: productData.porductName,
            qnt:quant,
            price:productData.sellingPrice
          })}>Add To Cart</button>
        </div>
        <table>
        <tbody>
        <tr>
          <td>SKU</td>
          <td>{productData.productSku}</td>
        </tr>
        <tr>
          <td>Status</td>
          <td>{productData.status}</td>
        </tr>
        <tr>
          <td>Type</td>
          <td>{productData.productCategory}</td>
        </tr>
        <tr>
          <td>Weigth</td>
          <td>{productData.size }{productData.sizeUnit }</td>
        </tr>
        

        </tbody>

        </table>
        </div>
        </div>}
    </div>
  )
}

export default ProductPage