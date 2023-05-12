import { Button } from '@mui/material'

import React from 'react'




function Profil() {

  return (

    <div className='Profil'>

        <div className='ProfilInfo'>

            <h1>Mein Profil</h1>

            <h2>Benutzername:</h2>

            <h2>E-mail:</h2>

            <h2>Semester:</h2>

            <h2>Belegte Module:</h2>

            <h2>Bestandene Module:</h2>

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


