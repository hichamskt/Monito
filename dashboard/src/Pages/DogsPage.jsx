import React, { useEffect, useState } from "react";
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
import UpdateDogForm from "../Components/UpdateDogForm/UpdateDogForm";
import axiosInstance from "../axios/axiosInstance";
import SmallDotedLoading from "../UI/Loading/SmallDotedLoading/SmallDotedLoading";
import Loading from "../UI/Loading/Loading";

function DogsPage() {
  const [showmore, setShowMore] = useState(false);
  const [showInfoBar, setShowInfo] = useState(false);
  const [showAddDogForm, setAddDogForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [ShowLeftSide, setShowLeftSide] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [item, setItem] = useState({});
  const [refresh, setRefresh] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/dog/getdogs");
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh]);

  
  if (loading) return <SmallDotedLoading />;
  if (error) return <p>Somthing went Wrong</p>;

  return (
    <div className="dogpage">
      {showInfoBar && (
        <Rightside
          setShowMore={setShowMore}
          setShowInfo={setShowInfo}
          showmore={showmore}
          showInfoBar={showInfoBar}
          setShowUpdateForm={setShowUpdateForm}
          setShowLeftSide={setShowLeftSide}
          item={item}
          setRefresh={setRefresh}
        />
      )}
      {showAddDogForm ? (
        <AddDogForm
          setAddDogForm={setAddDogForm}
          setShowInfo={setShowInfo}
          setRefresh={setRefresh}
          route={'dog/addnewdog'}
        />
      ) : (
        ShowLeftSide && (
          <LeftSide
            data={data}
            setItem={setItem}
            setAddDogForm={setAddDogForm}
            setShowInfo={setShowInfo}
            loading={loading}
          />
        )
      )}
      {showUpdateForm && (
        <UpdateDogForm
          setShowLeftSide={setShowLeftSide}
          setAddDogForm={setAddDogForm}
          setShowInfo={setShowInfo}
          setShowUpdateForm={setShowUpdateForm}
          item={item}
          setRefresh={setRefresh}
          route={'dog/updatdog'}
        />
      )}
    </div>
  );
}

export default DogsPage;

function Rightside({
  setShowMore,
  showmore,
  showInfoBar,
  setShowInfo,
  setShowUpdateForm,
  setShowLeftSide,
  item,
  setRefresh,
}) {
  const [loading, setLoading] = useState(true);

  const handleUpdatebutton = () => {
    setShowUpdateForm(true);
    setShowInfo(false);
    setShowLeftSide(false);
  };

  useEffect(() => {
    if (!item) setLoading(true);
    else setLoading(false);
  }, [item]);

  const hundleDelet = async () => {
    try {
      const response = await axiosInstance.delete("/dog/deletdogbyid", {
        data: { _id: item._id },
      });
      if (response.status === 200) {
        console.log("Deletion successful:", response.data);
        setShowMore(!showmore);
        setShowInfo(!showInfoBar);
        setRefresh((prv) => !prv);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(item);
  if (loading) return <p>Loading...</p>;

  const dateObj = new Date(item.birthDate);

  const bDate = dateObj.toLocaleDateString("en-GB");

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
            <div role="button" onClick={handleUpdatebutton}>
              <FiEdit />
              <p>Edit</p>
            </div>
            <div role="button" onClick={hundleDelet}>
              <MdDelete />
              <p>Delete</p>
            </div>
          </div>
        )}
      </div>
      <hr />
      <div className="dp-img">
        {item?.images && (
          <img
            src={`http://localhost:5000/${item?.images[0]?.url}`}
            alt="dog"
          />
        )}
      </div>
      <hr />
      <div className="dp-text">
        <h3>Details</h3>
        <div className="dp-text-ln">
          <p>Breed</p>
          <p>{item.category}</p>
        </div>
        <div className="dp-text-ln">
          <p>Name</p>
          <p>{item.name}</p>
        </div>
        <div className="dp-text-ln">
          <p>Sku</p>
          <p>{item.sku}</p>
        </div>
        <div className="dp-text-ln">
          <p>Genre</p>
          <p>{item.gender}</p>
        </div>
        <div className="dp-text-ln">
          <p>Size</p>
          <p>{item.size}</p>
        </div>
        <div className="dp-text-ln">
          <p>Price</p>
          <p>{item.price}</p>
        </div>
        <div className="dp-text-ln">
          <p>Color</p>
          <p>{item.color}</p>
        </div>
        <div className="dp-text-ln">
          <p>Vaccinated</p>
          <p>{item.vaccinated ? "Yes" : "No"}</p>
        </div>
        <div className="dp-text-ln">
          <p>certified</p>
          <p>{item.certified ? "Yes" : "No"}</p>
        </div>
        <div className="dp-text-ln">
          <p>Dewormed</p>
          <p>{item.dewormed ? "Yes" : "No"}</p>
        </div>
        <div className="dp-text-ln">
          <p>Microchip</p>
          <p>{item.microchip ? "Yes" : "No"}</p>
        </div>
        <div className="dp-text-ln">
          <p>birth Date</p>
          <p>{bDate}</p>
        </div>
        <div className="dp-text-ln">
          <p>Location </p>
          <p>{item.location}</p>
        </div>
      </div>
    </div>
  );
}

function LeftSide({ data, setAddDogForm, setShowInfo, setItem }) {
  const [itemOffset, setItemOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  const endOffset = itemOffset + 5;
  const currentItems =  filteredItems.slice(itemOffset, endOffset);


  



  function handleAddPrdClick() {
    setShowInfo(false);
    setAddDogForm(true);
  }
  function handleClick(item) {
    setItem(item);
    setShowInfo(true);
    console.log(item);
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="dogleftside">
      <h2 className="sectiontitle">Dogs</h2>
      <div className="search">
        <div className="searchinput">
          <FaSearch />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          ></input>
        </div>
        <button onClick={handleAddPrdClick}>+ Add Product</button>
      </div>
      {currentItems && (
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
              {currentItems?.map((item, index) => (
                <tr key={index} role="button" onClick={() => handleClick(item)}>
                  <td>
                    {item?.images && (
                      <img
                        src={`http://localhost:5000/${item?.images[0]?.url}`}
                        alt="dogimage"
                      ></img>
                    )}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.sku}</td>
                  <td>
                    <span className="db-category">{item.category}</span>
                  </td>
                  <td>
                    {" "}
                    <span className="db-status">{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="pagination">
        <Pagination
          data={data}
          itemOffset={itemOffset}
          setItemOffset={setItemOffset}
          currentItems={currentItems}
          itemsPerPage={6}
        ></Pagination>
      </div>
    </div>
  );
}
