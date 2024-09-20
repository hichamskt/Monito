import React from 'react'
import "../OverviewCard/OverviewCard.css"

function OverviewCard({children,title,totale}) {
  return (
    <div className='overviewCard'>
        <div className='text'><h4>{title}</h4>
        <h3>{totale}</h3>
        </div>
        {children}
    </div>
  )
}

export default OverviewCard