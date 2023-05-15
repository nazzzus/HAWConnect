import { Button } from '@mui/material'
import Profilbild from '../assets/Profilbild.png'
import React from 'react'
import pfp from '../assets/Profilbild.png'
import '../styles/Profil.css'



function Profil() {
    return (
        <div className='Profil'>
            <div className='ProfilContent'>
            <div className='ProfilBild'>
                <img src={pfp}/>;
            </div>
            <div className='ProfilInfo'>
                <h1>Mein Profil</h1>
                <h2>Benutzername:</h2>
                <h2>E-mail:</h2>
                <h2>Semester:</h2>
                <h2>Belegte Module:</h2>
                <h2>Bestandene Module:</h2>
            </div>
            </div>
            <div className='ProfilAenderungen'>
                <Button type='button'>
                    Daten ändern
                </Button>
                <Button type='button'>
                    Änderungen speichern
                </Button>
                <Button type='button'>
                    Passwort ändern
                </Button>
                <Button type='button'>
                    Konto löschen
                </Button>
            </div>
        </div>
    )
}




export default Profil


