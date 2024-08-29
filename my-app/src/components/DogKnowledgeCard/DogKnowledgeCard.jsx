import React from 'react'
import "../DogKnowledgeCard/DogKnowledgeCard.css"
 
function DogKnowledgeCard({item}) {
  return (
    <div className='dogknowledgecard'>
      <div>
        <img src={item.imag} alt='img'></img>
      </div>
      <p className='petknow'>Pet Knowledge</p>
      <h2>{item.title}</h2>
      <p>{item.desc}</p>
    </div>
  )
}

export default DogKnowledgeCard