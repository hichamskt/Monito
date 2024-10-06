import React, { useEffect, useState } from "react";
import "../Styles/orders.css";
import { FaSearch } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { CiExport } from "react-icons/ci";
import { HiDotsVertical } from "react-icons/hi";
import Pagination from "../Components/Pagination/Pagination";

function Orders() {
const [showFiltter,setShowFiltter]=useState(false);
const data = [1,2,3,4,5,6,7,8,96,7,8,9];

  return (
    <div className="ordersPage">
      <h3 className="or-title">Orders</h3>
      <div className="orders-top">
        <div className="ord-search-section">
          <FaSearch />
          <input type="text" placeholder="Search"></input>
        </div>
        <div className="ot-rightside">
          <select id="options" value="dd">
            <option value="">Category</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
{/*fillter*/}
          <div className="ord-filter" role="button" >
            <p className="ord-clc" onClick={()=>setShowFiltter(!showFiltter)}>Fillter</p>
            <IoFilterSharp className="ord-clc" onClick={()=>setShowFiltter(!showFiltter)} />
            {showFiltter && <div className="ord-f-drop">
              <div className="ord-date">
                <h4>Date</h4>
                <div className="ord-dategrp">
                  <div className="ord-input-group">
                    <span className="ord-ig-text">Starting date</span>
                    <input type="date" className="ad-field" placeholder="" />
                  </div>
                  <div className="ord-input-group">
                    <span className="ord-ig-text">Ending date</span>
                    <input type="date" className="ad-field" placeholder="" />
                  </div>
                </div>
              </div>
              <hr></hr>
              <div className="ord-city">
                  <h4>City</h4>
                <div className="ord-city-search">
                  <FaSearch />
                  <input type="text" placeholder="Search"></input>
                </div>
              </div>
              <hr />
              <div className="ord-status">
                <div className="ord-st-grop">
                  <h4>Status</h4>
                  <div className="ord-st">
                  <div>
                    
                    <input
                      type="checkbox"
                      id="progress"
                      name="progress"
                      value="progress"
                    />
                    <label htmlFor="progress"> In Progress</label>
                  </div>

                  <div>
                    
                    <input
                      type="checkbox"
                      id="Cancelled"
                      name="Cancelled"
                      value="Cancelled"
                    />
                    <label for="Cancelled"> Cancelled</label>
                  </div>

                  <div>
                    
                    <input
                      type="checkbox"
                      id="Deliverd"
                      name="Deliverd"
                      value="Deliverd"
                    />
                    <label for="Deliverd"> Deliverd</label>
                  </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="ord-btns">
                <button onClick={() =>setShowFiltter(false)}>Cancel</button>
                <button >Filter</button>
              </div>
            </div>}
          </div>

          <button className="ord-export">
            <CiExport />
            Export
          </button>
        </div>
      </div>
            <OrdersTable data={data} />
      <div className="orderpage-footer">
        <h5 className="ord-rslt">106 Results</h5>
        <Pagination></Pagination>
      </div>
    </div>
  );
}

export default Orders;



function OrdersTable({data}){
  

  return(<div className="OrdersTable">
    <table>
      <thead>
        <tr>
          <th>ITEMS</th>
          <th>VALUE($)</th>
          <th>DELIVRED TO</th>
          <th>Date</th>
          <th>STATUS</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr>
            <td>
              item{index}
            </td>
            <td>1990</td>
            <td>agadir</td>
            <td>
              <span className="db-category">12/2/2028</span>
            </td>
            <td>
              
              <span className="ordt-status">Cannceled</span>
            </td>
            <MoreDrop />
          </tr>
        ))}
      </tbody>
    </table>
  </div>)
}

function MoreDrop(){
  const [showMore,setShowMore]= useState(false);

  const handleClickOutside = (e) =>{
    console.log(showMore)
    if(!e.target.classList.contains("ordmore")){
      
      console.log(e.target.classList)
      setShowMore(false);
      console.log(showMore)
    }
  }
  useEffect (()=>{
    if(showMore){document.addEventListener('click', handleClickOutside)
    
    }else{
      document.removeEventListener('click', handleClickOutside);
    } ;
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
  },[showMore])

  


  return(<td className="ord-box-more">
    <HiDotsVertical className="ordmore" onClick={()=> setShowMore(!showMore)}/>
    
      {showMore && <ul className="ordmore-drop" >
        <li>Cannceled</li>
        <li>Pending</li>
        <li>Delivred</li>
        <li>In Progress</li>
        <li>Details</li>
        <li>Delet</li>
      </ul>}
    
  </td>)
}

