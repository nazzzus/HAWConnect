import React from 'react'
import'../styles/Mensa.css'

function Mensa() {
  return (
    <div className='main'>
        <div className='title'>
            Mensa
        </div>
        <div className='verlinkung'>
            <iframe id='B' src={"https://www.stwhh.de/speiseplan?t=this_week"} width="100%" frameBorder="0">
                </iframe>
        </div>
    </div>
  )
}

export default Mensa