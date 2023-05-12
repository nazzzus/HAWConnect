import React from 'react'

function SemesterItem({title,name,text}) {
  return (
    <div className='semItem'>
        <div className='semTitle'>
            <span>{name}</span>
        </div>
            <p>{text}</p>
    </div>
  )
}

export default SemesterItem