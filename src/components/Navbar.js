import React, { useState, useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import '../styles/Navbar.css'
import ReorderIcon from '@mui/icons-material/Reorder';
import Header from '../components/Header'
import useCookies from 'react-cookie/cjs/useCookies'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function Navbar() {


    const [cookies, setCookies] = useCookies(['access_token']);
    const navigate = useNavigate();

    const logout = () => {
        setCookies('access_token', '');
        window.localStorage.removeItem("userID");
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Du hast dich erfolgreich abgemeldet.'
            }).then(() => {
                navigate('/Auth');
          })
          localStorage.clear();
     
    }

    

    const [openLinks, setOpenLinks] = useState(false);

    const toggleNavbar = () => {
        setOpenLinks(!openLinks);
    }

  return (
    <div className='navbar'>
       <div className='leftSide'>
                <Header/>
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