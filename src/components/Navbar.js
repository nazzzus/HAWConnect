import React, { useState } from 'react'
import Logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'
import Profil from '../images/user.png'
import Mail from '../images/email.png'
import Settings from '../images/settings.png'
import LoginIcon from '../images/login.png'
import ReorderIcon from '@mui/icons-material/Reorder';
import Login from '../pages/Login'


function Navbar() {

    const [openLinks, setOpenLinks] = useState(false);

    const toggleNavbar = () => {
        setOpenLinks(!openLinks);
    }

  return (
    <div className='navbar'>
        <div className='leftSide' id={openLinks ? "open" : "close"}>
            <div className='logoSide'>
            <Link to="/">
            <img src={Logo} />
            </Link>
            </div>
            <div className='hiddenLinks'>
            <Link to="/">
                <p>Home         
                </p>
            </Link>
            <Link to="/planer">
                <p>Planer
                </p>
            </Link>
            <Link to="/kurse">
            <p>Kurse
                </p>
            </Link>
            <Link to="/mensa">
            <p>Mensa</p>
            </Link>
            <Link to="/bibliothek">
            <p>Bibliothek</p>
            </Link>
            </div>
        </div>

        <div className='midSide'>
            <Link to="/">
                Home
            </Link>
            <Link to="/planer">
                Planer
            </Link>
            <Link to="/kurse">
                Kurse
            </Link>
            <Link to="/mensa">
                Mensa
            </Link>
            <Link to="/bibliothek">
                Bibliothek
            </Link>
            <button onClick={toggleNavbar}>
            <ReorderIcon />
            </button>
        </div>

        <div className='rightSide'>
            <Link to="/profil">
                <img src={Profil} />
            </Link>
            <Link to="/einstellungen">
                <img src={Settings} />
            </Link>
            <Link to="/Login">
                <img src={LoginIcon} />
            </Link>  
            <Link to="https://outlook.de/" target="_blank" rel="noopener noreferrer">
                <img src={Mail} />
            </Link> 
        </div>
    </div>
  )
}

export default Navbar