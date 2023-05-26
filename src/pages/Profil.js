import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useGetUserId } from '../hooks/useGetUserId';
import '../styles/Profil.css'
import ProfileImages from '../helpers/ProfileImages';
import Pfp from '../helpers/Pfp';

const Profil = () => {
  const [user, setUser] = useState(null);
  const userId = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE");
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/notis/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${cookies.access_token}` // Setzen Sie den access_token im Header
          }
        });

        setUser(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, [userId, cookies.access_token]);

  const handleProfilePictureUpload = () => {
    // Handle logic for profile picture upload here
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
          <div className='Profil'>
            <div className='bg-Profil'>
              <div className='window-Profil'>
                <div className='ProfilInfo'>
                  <div className='ProfilTitle'>
                    <h1>User Profile</h1>
                    <Pfp/>
                  </div>
                  <div className="ProfilName">
                      <div className='ProfilName-Teil'>
                      <h2>Username: </h2> <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.username}</p>
                      </div>
                      <div className='ProfilName-Teil'>
                      <h2>Vorname: </h2><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.vorname}</p>
                      </div>
                      <div className='ProfilName-Teil'>
                      <h2>Nachname: </h2><p>&nbsp;&nbsp;&nbsp;&nbsp;{user.nachname}</p>
                      </div>
                      <div className='ProfilName-Teil'>
                      <h2>Geschlecht: </h2><p>&nbsp;&nbsp;&nbsp;{user.geschlecht}</p>
                      </div>
                      <div className='ProfilName-Teil'>
                      <h2>Studiengang: </h2><p>&nbsp;{user.studiengang}</p>
                      </div>
                      <div className='ProfilName-Teil'>
                      <h2>Geburtstag: </h2><p>&nbsp;&nbsp;&nbsp;{formatDate(user.geburtstag)}</p>
                      </div>
                      <div className='ProfilName-Teil'>
                      <h2>Email: </h2><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.email}</p>
                      </div>
                      <div className='ProfilName-Teil'>
                      <h2>Semester: </h2><p>&nbsp;&nbsp;&nbsp;{user.semester}</p>
                      </div>
                  </div>
            </div>
            <div className='ProfilButton'>
              <div className='ButtonRow'>
              <button>
                Daten ändern
              </button>
              <button>
              Änderungen speichern
              </button>
              </div>
              <div className='ButtonRow'>
              <button>
                Passwort ändern
              </button>
              <button>
                Konto löschen
              </button>
              </div>
              <ProfileImages/>
            </div>
            </div>
            </div>
          </div>
            
    
  );
};

export default Profil;