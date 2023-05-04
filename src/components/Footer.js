import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import { Link } from 'react-router-dom'
import Datenschutz from '../pages/Datenschutz';
import Impressum from '../pages/Impressum';
import '../styles/Footer.css'


function Footer() {
  return (
    <div className='footer'>
        <div className='socialMedia'> 
        <Link to="https://www.instagram.com/hawhamburg/?hl=de" target="_blank" rel="noopener noreferrer" >
          <InstagramIcon /> 
        </Link> 
        <Link to="https://twitter.com/HAW_Hamburg?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank" rel="noopener noreferrer">
        <TwitterIcon /> 
        </Link>
        <Link to="https://www.facebook.com/HAW.Hamburg/?locale=de_DE" target="_blank" rel="noopener noreferrer">
          <FacebookIcon />
        </Link>
        </div>
        <p> &copy; 2023 HAWConnect.de</p>
        <Link to="/Impressum">
                <p> Impressum </p>
        </Link>
        <Link to="/Datenschutz">
                <p> Datenschutz </p>
        </Link>
    </div>
  )
}

export default Footer