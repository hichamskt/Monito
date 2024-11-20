import React from 'react'
import "../styles/AboutPage.css"
import PetSellers from '../components/PetSellers/PetSellers'
import Header from '../components/Header/Header'
import AdoptionPoster from '../components/AdoptionPoster/AdoptionPoster'
import dogs from "../assets/dooog.jpg"
import dog from "../assets/doogi.jpg"
import Footer from "../components/Footer/Footer"
function AboutPage() {
  return (
    <div className='container'>
        <Header/>
        <div className='padd'></div>
        <img src={dog} alt='dog'/>
        <div className='welcom'>
            <h1>Welcome to Monito Pets Store!</h1>
            <p>We’re your trusted local pet shop, dedicated to offering top-notch products, outstanding service, and expert advice to pet parents in our community.</p>
        </div>
        
        <div className='ourstory'>
          <img src={dogs} alt='dog'/>
        <div className='ourstotyright'>
        <h1>Our Story</h1>
        <p>Monito Pets Store opened its doors in 2010 with one clear mission: to become the neighborhood’s most reliable and caring pet supply store. Our founder, Jane Smith, a lifelong animal enthusiast and dedicated pet owner, envisioned a warm, family-friendly shop where pets are treated like cherished members of the family. After spending over a decade working at large chain stores, Jane turned her dream into a reality by creating Monito Pets—a place where the well-being of pets and their owners always comes first.</p>
        </div>
        </div>
        <div className='welcom' >
        <h1>What We Offer</h1>
        <p>At Monito Pets Store, we provide an extensive selection of premium pet foods, treats, toys, beds, leashes, and more—everything your furry, feathery, or scaly companions could ever need. As pet lovers ourselves, we carefully choose only high-quality products from reputable brands to ensure the best for your pets. We stay ahead of the curve by keeping up with the latest trends and innovations in pet care, offering you the finest solutions for your beloved animals.</p>
        </div>
        <PetSellers/>
        <AdoptionPoster/>
        <div className='welcom' >
        <h1>Our Commitment</h1>
<p>
At Monito Pets Store, your pets’ well-being is our priority. We’re dedicated to promoting healthy, happy lives for all animals by fostering strong bonds between pets and their humans. With compassion and expertise, we aim to make every visit a positive experience for you and your four-legged (or two-winged, or no-legged!) family members.

We’re more than just a pet store—we’re a community of animal lovers who genuinely care about your pets. We invite you to visit us and shop local, knowing you’re supporting a team that values your pets as much as you do.

Stop by today—we can’t wait to welcome you and your furry friends into the Monito Pets Store family!
  </p>        </div>
        <Footer />
    </div>
  )
}

export default AboutPage