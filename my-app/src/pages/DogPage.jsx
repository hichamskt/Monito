import React, { useState } from "react";
import "../styles/DogPage.css";
import Header from "../components/Header/Header";
import rarrow from "../assets/Caret_Left_SM.png";
import larrow from "../assets/arrowleft.png";
import sharei from "../assets/shareicon.png";
import iconealth from "../assets/healthicon.png";
import iconprd from "../assets/petiden.png";
import fb from "../assets/fb.png";
import twitter from "../assets/twiter.png";
import youtube from "../assets/youtube.png";
import insta from "../assets/insta.png";
import chat from "../assets/chat.png";
import BreadCrumb from "../UI/BreadCrumb/BreadCrumb";
import axiosInstance from "../axios/axiosInstance";

import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import ShopIcone from "../UI/ShopIcone/ShopIcone";
import Cart from "../components/Cart/Cart";
import { useAppContext } from "../AppContex";
import TitleSection from "../components/TitleSection/TitleSection";
import ProductCard from "../components/ProductCard/ProductCard";




function DogPage() {
  const [dogData, setDogData] = useState([]);
  const [dogsData, setDogsData] = useState([]);
  const [selectedImg, setSelectedImg] = useState(()=>{
    return dogData?.images && dogData.images[0]
    ? { index: 0, url: dogData.images[0].url }
    : { index: 0, url: "" };
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { setShowCard ,showCard , currency ,  rate} = useAppContext();


  

  const convertPrice = (price) => {

    return (price * rate).toFixed(2); 
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/dog/getdogs");
        setDogsData(response.data);
      } catch (err) {
        console.log(err)
      } 
    };

    fetchData();

  }, []);

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await axiosInstance.get(`/dog/getdogbyid/${id}`);
        setDogData(response.data.dog);
        setSelectedImg({ index: 0,url:response.data.dog.images[0].url})

      } catch (err) {
        console.log(err);
      } finally {
      setLoading(false);
    }
    };

    fetchData(id);

  }, [id]);

  

  const rightArrowHundler= ()=>{
    if(dogData.images.length>selectedImg.index+1){
      setSelectedImg({ index: selectedImg.index + 1,url:dogData.images[selectedImg.index+1].url})
    }else{
      setSelectedImg({ index: 0 ,url:dogData.images[0].url})
    }
  }

  const leftArrowHundler= ()=>{
    if(0 < selectedImg.index){
      
      setSelectedImg({ index: selectedImg.index - 1,url:dogData.images[selectedImg.index-1].url})
    }else{
      
      setSelectedImg({ index: dogData.images.length-1 ,url:dogData.images[selectedImg.index-1].url})
    }

  }


  const date = new Date(dogData.createdAt);
  
  const formattedDate = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });


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
    <div className="container">
      <Header></Header>
      {showCard && <Cart/>}
      {showCard && <div className='overlay-black'></div>}
      
      <ShopIcone/>
      {loading? "loading": <div className="dogPage">
        <div className="dogSection">
          <div className="dpleftside">
            <div className="mainimg">
              <div className="arleft">
                <img src={larrow} alt="larrarow" onClick={leftArrowHundler}></img>
              </div>
              <img  src={`${process.env.REACT_APP_BACKEND_URL}${selectedImg?.url}`}  alt="dog" className="maini"></img>
              <div className="arright">
                <img src={rarrow} alt="raraow" onClick={rightArrowHundler}></img>
              </div>
            </div>
            <div className="aimgs">
              {dogData.images.map((item, index) => (
                <img  src={`${process.env.REACT_APP_BACKEND_URL}${item?.url}`} key={index} alt="dog" onClick={()=>setSelectedImg({index,url:item.url})} className={selectedImg.img===item?"active":""}></img>
              ))}
            </div>
            <div className="healthsec">
              <img src={iconealth} alt="health"></img>
              <p>100% health guarantee for pets</p>
              <img src={iconprd} alt="pro"></img>
              <p>100% guarantee of pet identification</p>
            </div>
            <div className="sharesec">
              <img src={sharei} alt="share"></img>
              <p>Share:</p>
              <div className="socials">
                <img src={fb} alt="socials"></img>
                <img src={twitter} alt="socials"></img>
                <img src={insta} alt="socials"></img>
                <img src={youtube} alt="socials"></img>
              </div>
            </div>
          </div>
          <div className="sprightside">
            <BreadCrumb tring="Home category Dog ShibaInuSepia"></BreadCrumb>
            <p>SKU{dogData.sku}</p>
            <h3>{dogData.name}</h3>
            <h3>{convertPrice(dogData.price)}{currency}</h3>
            <div className="btnsgpp">
              <button>Contact us</button>
              <button>
                <img src={chat} alt="chat"></img> Chat with Monito
              </button>
            </div>
            <table>
              <tbody>
                <tr>
                  <td >
                    <p>SKU</p>
                  </td>
                  <td>
                    <p>:{dogData.sku}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Gender</p>
                  </td>
                  <td>
                    <p>:{dogData.gender}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Age</p>
                  </td>
                  <td>
                    <p>:{calculateAge(dogData.birthDate)}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Size</p>
                  </td>
                  <td>
                    <p>:{dogData.size}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Color</p>
                  </td>
                  <td>
                    <p>:{dogData.color}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Vaccinated</p>
                  </td>
                  <td>
                    <p>:{dogData.vaccinated?'Yes':"NO"}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Dewormed</p>
                  </td>
                  <td>
                    <p>:{dogData.dewormed?"Yes":"No"}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Cert</p>
                  </td>
                  <td>
                    <p>:{dogData.certified?'Yes':"No"}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>MicorShip</p>
                  </td>
                  <td>
                    <p>:{dogData.microchip?"Yes":"No"}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Location</p>
                  </td>
                  <td>
                    <p>:{dogData.location}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Published Date</p>
                  </td>
                  <td>
                    <p>:{formattedDate}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Additional Information</p>
                  </td>
                  <td>
                    <p>:{dogData.additionalInfo}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>}
      <TitleSection
          Title="Hard to choose right products for your pets?"
          Text="Our Products"
          ButtonText="View more"
          linktonavigate='/Products'
        ></TitleSection>
        
        <div className="dogsSection">
          {dogsData?.map((item, index) => (
            <Link to={`/dog/${item.id}`} key={index} style={{ textDecoration: "none"}}>
            <ProductCard
              imag={item.images}
              desc={item.name}
              gene={item.gender}
              age={item.birthDate}
              prix={item.price}
              key={index}
            ></ProductCard>
            </Link>
            
          ))}
        </div>
    </div>
  );
}

export default DogPage;
