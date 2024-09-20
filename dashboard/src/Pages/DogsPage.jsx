import React from "react";
import "../Styles/DogPage.css";
import { useOutletContext } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import dog from "../assets/dog1.png"

function DogsPage() {

    const data = [1, 2, 3, 4, 5,6,7];

  return (
    <div className="dogpage">
      <div className="dogleftside">
        <h2 className="sectiontitle">Dogs</h2>
        <div className="search">
          <div className="searchinput">
            <FaSearch />
            <input type="text" placeholder="Search"></input>
          </div>
          <button>+ Add Product</button>
        </div>
        <div className="dogsTable">
            <table>
            <thead>
                <tr>
                <th>Pet</th>
                <th>Name</th>
                 <th>Usk</th>
                 <th>Category</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item,index)=>(
                    <tr>
                        <td><img src={dog}></img></td>
                        <td>shiba</td>
                        <td>#ki233344</td>
                        <td>Rorwealer</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
        <div className="pagination"></div>
      </div>
    </div>
  );
}

export default DogsPage;
