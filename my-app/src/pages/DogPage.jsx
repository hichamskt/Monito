import React, { useState } from "react";
import "../styles/DogPage.css";
import Header from "../components/Header/Header";
import img1 from "../assets/prddog1.png";
import img2 from "../assets/prddog2.png";
import img3 from "../assets/prddog3.png";
import img4 from "../assets/prddog4.png";
import img5 from "../assets/prddog5.png";
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
const doginfo = {
  SKU: "#1000078",
  Breed: "Shiba Inu Sepia",
  Price: "34.000.000 VND",
  Gender: "Female",
  Age: "2 Months",
  Size: "Small",
  Color: "Apricot & Tan",
  Vaccinated: "Yes",
  Dewormed: "Yes",
  Cert: "Yes (MKA)",
  Microchip: "Yes",
  Location: "Vietnam",
  Published_Date: "12-Oct-2022",
  imgs: [img1, img2, img3, img4, img5],
  Additional_Info:
    "Pure breed Shih Tzu Good body structure With MKA cert and Microchip Father from champion lineage",
};

function DogPage() {
  const [selectedImg, setSelectedImg] = useState(img1);


  return (
    <div className="container">
      <Header></Header>
      <div className="dogPage">
        <div className="dogSection">
          <div className="dpleftside">
            <div className="mainimg">
              <div className="arleft">
                <img src={larrow} alt="larrarow"></img>
              </div>
              <img src={selectedImg} alt="dog" className="maini"></img>
              <div className="arright">
                <img src={rarrow} alt="raraow"></img>
              </div>
            </div>
            <div className="aimgs">
              {doginfo.imgs.map((item, index) => (
                <img src={item} key={index} alt="dog" onClick={()=>setSelectedImg(item)}></img>
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
            <p>SKU{doginfo.SKU}</p>
            <h3>{doginfo.Breed}</h3>
            <h3>{doginfo.Price}</h3>
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
                    <p>:{doginfo.SKU}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Gender</p>
                  </td>
                  <td>
                    <p>:{doginfo.Gender}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Age</p>
                  </td>
                  <td>
                    <p>:{doginfo.Age}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Size</p>
                  </td>
                  <td>
                    <p>:{doginfo.Size}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Color</p>
                  </td>
                  <td>
                    <p>:{doginfo.Color}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Vaccinated</p>
                  </td>
                  <td>
                    <p>:{doginfo.Vaccinated}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Dewormed</p>
                  </td>
                  <td>
                    <p>:{doginfo.Dewormed}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Cert</p>
                  </td>
                  <td>
                    <p>:{doginfo.Cert}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>MicorShip</p>
                  </td>
                  <td>
                    <p>:{doginfo.Microchip}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Location</p>
                  </td>
                  <td>
                    <p>:{doginfo.Location}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Published Date</p>
                  </td>
                  <td>
                    <p>:{doginfo.Published_Date}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Additional Information</p>
                  </td>
                  <td>
                    <p>:{doginfo.Additional_Info}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DogPage;
