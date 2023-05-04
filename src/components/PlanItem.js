import React from 'react'

function PlanItem({image,name,text}) {
  return (
    <div className='planItem'>
        <div style={{backgroundImage: `url(${image})`}}>
        </div>
        <h1>{name}</h1>
        <p>{text}</p>
    </div>
  )
}

export default PlanItem