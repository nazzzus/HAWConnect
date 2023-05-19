import React, { useState, useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import '../styles/Navbar.css'
import ReorderIcon from '@mui/icons-material/Reorder';
import Header from '../components/Header'
import useCookies from 'react-cookie/cjs/useCookies'
import { useNavigate } from 'react-router-dom';



function Navbar() {


    const [cookies, setCookies] = useCookies(['access_token']);
    const navigate = useNavigate();

    const logout = () => {
        setCookies('access_token', '');
        window.localStorage.removeItem("userID");
        navigate('/Auth');
    }

    const [openLinks, setOpenLinks] = useState(false);

    const toggleNavbar = () => {
        setOpenLinks(!openLinks);
    }

  return (
    <div className='navbar'>
       <div className='leftSide' id={openLinks ? "open" : "close"}>
            <div className='logoSide'>
                <Header/>
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
                <button>Profil</button>
            </Link>
            {!cookies.access_token ? (
            <Link to="/Auth">
                <button>Zum Login</button>
            </Link> ): (
            <Link to="/">   
                <button onClick={logout}>Logout</button></Link> 
                )}
            
            <Link to="https://outlook.de/" target="_blank" rel="noopener noreferrer">
                <button>Mail</button>
            </Link> 
        </div>
    </div>
  )
}

export default Navbar