import React, { useState } from "react";
import "../Styles/DogPage.css";
import { useOutletContext } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import dog from "../assets/dog1.png";
import Pagination from "../Components/Pagination/Pagination";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import imgg from "../assets/dog1.png";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import AddDogForm from "../Components/AddDogForm/AddDogForm";

function DogsPage() {
  const [showmore, setShowMore] = useState(false);
  const [showInfoBar, setShowInfo] = useState(false);
  const [showAddDogForm, setAddDogForm] = useState(true);
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="dogpage">
      {showInfoBar && (
        <Rightside
          setShowMore={setShowMore}
          setShowInfo={setShowInfo}
          showmore={showmore}
          showInfoBar={showInfoBar}
        />
      )}
      {showAddDogForm ? <AddDogForm /> : <LeftSide data={data} />}
    </div>
  );
}

export default DogsPage;

function Rightside({ setShowMore, showmore, showInfoBar, setShowInfo }) {
  return (
    <div className="rightside">
      <div className="dp-rs-header">
        <BsThreeDotsVertical
          className="dp-points"
          onClick={() => setShowMore(!showmore)}
        />
        <RxCross2
          className="db-cross"
          onClick={() => setShowInfo(!showInfoBar)}
        />
        {showmore && (
          <div className="db-more">
            <div>
              <FiEdit />
              <p>Edite</p>
            </div>
            <div>
              <MdDelete />
              <p>Delet</p>
            </div>
          </div>
        )}
      </div>
      <hr />
      <div className="dp-img">
        <img src={imgg} alt="dog" />
      </div>
      <hr></hr>
      <div className="dp-text">
        <h3>Deails</h3>
        <div className="dp-text-ln">
          <p>Breed</p>
          <p>Shiba Inu Sepai</p>
        </div>
        <div className="dp-text-ln">
          <p>Name</p>
          <p>Spike</p>
        </div>
        <div className="dp-text-ln">
          <p>Sku</p>
          <p>#100024</p>
        </div>
        <div className="dp-text-ln">
          <p>Genre</p>
          <p>Female</p>
        </div>
        <div className="dp-text-ln">
          <p>Size</p>
          <p>Small</p>
        </div>
        <div className="dp-text-ln">
          <p>price</p>
          <p>50000vnd</p>
        </div>
        <div className="dp-text-ln">
          <p>Color</p>
          <p>Appricot</p>
        </div>
        <div className="dp-text-ln">
          <p>Vaccianted</p>
          <p>Yes</p>
        </div>
        <div className="dp-text-ln">
          <p>Dewormed</p>
          <p>Yes</p>
        </div>
        <div className="dp-text-ln">
          <p>Published date</p>
          <p>12/october/2023</p>
        </div>
      </div>
      <h1></h1>
    </div>
  );
}

function LeftSide({ data }) {
  return (
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
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr>
                <td>
                  <img src={dog}></img>
                </td>
                <td>shiba</td>
                <td>#ki233344</td>
                <td>
                  <span className="db-category">Rorwealer</span>
                </td>
                <td>
                  {" "}
                  <span className="db-status">solde</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <Pagination></Pagination>
      </div>
    </div>
  );
}
