import React, { Component } from 'react'
import BannerImage from '../assets/bibBanner.png'
import '../styles/Bibliothek.css'
import BibService from '../components/BibService'
import {Link} from 'react-router-dom'
import  Viewbook from '../helpers/view-book'



function Bibliothek() {
  return (
    <div className='Bibliothek'>
        <div className='BibTitle' style={{ backgroundImage: `url(${BannerImage})` }}>
        </div>
        <div className='BibTitleText'>
        <h1>
                Alles rund um unsere eigenen Bibliotheken!
            </h1>
            <h2>
                Du suchst nach Büchern oder willst dich besser organisieren, was die Bibliotheksausleihen angeht?
            </h2>
        </div>
        <div className='BibContent'>
            <div className='BibContentLeftMid'>
                <div className='BibContentBuchsuche'>
                <h1>
                       Du suchst nach einem bestimmten Buch?
                </h1>
                <iframe id='Bsuche' src={"https://katalog.haw-hamburg.de/vufind/"}></iframe>
                </div>
                <div className='BibContentBuchAusleihen'>
                    <Viewbook/>
                    <BibService/>
                </div>
            </div>
            <div className='BibContentRight'>
                <h1>
                    Du möchtest die Standorte und Öffnungszeiten der HAW-Bibliotheken auf einem Blick sehen?
                </h1>
                <Link to='/BibList'>
                <button  type="button">
                    Hier kommst du zum Überblick!
                </button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Bibliothek