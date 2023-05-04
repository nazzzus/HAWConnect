import React from 'react'

function BibItem({name, adresse, oeffnungszeiten1, oeffnungszeiten2, oeffnungszeiten3, oeffnungszeiten4, oeffnungszeiten5, standort}) {
  return (
    <div className='BibItemSingle'>
      <div className='BibItemText'>
      <h1>{name}</h1>
      <p>{adresse}</p>
      <p>{oeffnungszeiten1}</p>
      <p>{oeffnungszeiten2}</p>
      <p>{oeffnungszeiten3}</p>
      <p>{oeffnungszeiten4}</p>
      <p>{oeffnungszeiten5}</p>
      </div>
      <iframe src={standort}></iframe>
    </div>
  )
}

export default BibItem