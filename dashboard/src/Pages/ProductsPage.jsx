import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import "../Styles/ProductsPage.css"
import dog from "../assets/dog1.png";
import { FaPencilAlt } from "react-icons/fa";
import Pagination from '../Components/Pagination/Pagination';
import AddProductForm from '../Components/AddProductForm/AddProductForm';
import UpdateProduct from '../Components/UpdateProduct/UpdateProduct';
import axiosInstance from '../axios/axiosInstance';



function ProductsPage() {
  const [showAddPrd,setShowAddPrd]=useState(false);
  const [showUpdatePrd,setShowUpdatePrd]=useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("")
  const [data,setData]=useState([])
  const [item,setItem]=useState([])
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = data.filter((item) =>
    item.porductName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.productCategory.toLowerCase().includes(searchTerm.toLowerCase())||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/product/getallproducts");
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, [refresh]);



  function hundleUpdateButton (item){
    setShowUpdatePrd(true);
    setItem(item);
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handleStatus = async (productId) => {
  
    const prd = data.find((item) => item._id === productId);
    let newStatus = '';
  
    
    if (prd && prd.status === 'Available') {
      newStatus = 'Sold';
    } else {
      newStatus = 'Available'; 
    }
  
    try {
      
       await axiosInstance.post("/product/modifieproductstatus", {
        _id: productId,
        status: newStatus,
      });
  
      
      
    } catch (err) {
      
      setError(err);
    } finally {
      
      fetchData();
    }
  };
  
    
   


    
  return (
    <div className='product-Page'>
      {showAddPrd && <AddProductForm  setShowAddPrd={setShowAddPrd}></AddProductForm>}
      {showUpdatePrd && <UpdateProduct setShowUpdatePrd={setShowUpdatePrd} item={item}></UpdateProduct>}
      {showAddPrd && <div className='darkeffect'></div>}
      {showUpdatePrd && <div className='darkeffect'></div>}
        <h2 className="pp-sectiontitle">Products Listing</h2>
        <div className="pp-search">
        <div className="pp-searchinput">
          <FaSearch />
          <input type="text" placeholder="Search" value={searchTerm}
            onChange={handleSearch}></input>
        </div>
        <button onClick={()=>setShowAddPrd(true)}>+ Add Product</button>
      </div>
        {/* Prosuct Table*/}
        <div className="ProductsTable">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Name</th>
              <th>Status</th>
              <th>Category</th>
              <th>Inventory</th>
              <th>Price</th>
              
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr>
                <td>
                {item?.images && (
          <img
            src={`http://localhost:5000/${item?.images[0]?.url}`}
            alt="dog"
          />
        )}
                </td>
                <td>{item.porductName}</td>
                <td>
                <label class="switch">  
                <input type="checkbox" value="status"  checked={item.status === "Available"}  onChange={()=>handleStatus(item._id)}  />
                <span class="slider round"></span>
                  </label>
                  </td>
                <td>
                   {item.productCategory}
                </td>
                <td>
                  {item.quantity}
                </td>
                <td>
                  <span >{item.sellingPrice}</span>
                </td>
                <td>
                  <span className='pointer' role='button' onClick={()=>hundleUpdateButton(item)}><FaPencilAlt /></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        {/* <Pagination></Pagination> */}
      </div>
    </div>
  )
}

export default ProductsPage