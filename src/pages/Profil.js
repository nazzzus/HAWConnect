import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useGetUserId } from '../hooks/useGetUserId';
import '../styles/Profil.css'
import ProfileImages from '../helpers/ProfileImages';
import Pfp from '../helpers/Pfp';
import Swal from 'sweetalert2';

const Profil = () => {
  const [user, setUser] = useState(null);
  const userId = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);
  const [editUserId, setEditUserId] = useState(null);
  const [editUser, setEditUser] = useState({
    vorname: "",
    nachname: "",
    geschlecht: "",
    studiengang: "",
    email: ""
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE");
  };

  const updateSemester = async (newSemester) => {
    try {
      await axios.put(
        `http://localhost:3001/auth/user/${userId}`,
        { semester: newSemester },
        {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        }
      );
      setSemester(newSemester);
    } catch (error) {
      console.error(error);
    }
  };
  
  const incrementSemester = () => {
    if (semester < 14) {
      const newSemester = semester + 1;
      updateSemester(newSemester);
    }
  };
  
  const decrementSemester = () => {
    if (semester > 1) {
      const newSemester = semester - 1;
      updateSemester(newSemester);
    }
  };
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/notis/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`
          }
        });
  
        setUser(response.data.user);
        setSemester(response.data.user.semester); 
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchUserProfile();
  }, [userId, cookies.access_token]);
  


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/notis/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`
          }
        });

        setUser(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, [userId, cookies.access_token]);


  const [semester, setSemester] = useState(null);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    try {
      Swal.fire({
        title: 'Bist du dir sicher?',
        text: 'Du kannst das nicht rückgängig machen!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Abbrechen',
        confirmButtonText: 'Ja, Account permanent löschen!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire('Gelöscht!', 'Dein Account wurde gelöscht', 'success');
          await axios.delete(`http://localhost:3001/profil/delete/${userId}`, {
            headers: {
              Authorization: `Bearer ${cookies.access_token}`
            }
          });
          setUser(null);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleEdit = () => {
    setEditUserId(user._id);
    setEditUser({
      vorname: user.vorname,
      nachname: user.nachname,
      geschlecht: user.geschlecht,
      studiengang: user.studiengang,
      email: user.email
    });
  };
  
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3001/profil/edit/${userId}`,
        { ...editUser },
        {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        }
      );
      setEditUserId(null);
      setUser({ ...user, ...editUser });
    } catch (error) {
      console.error(error);
    }
  };

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
                <h2>Username: </h2> 
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.username}</p>
              </div>
              <div className='ProfilName-Teil'>
                <h2>Vorname: </h2>
                {editUserId === user._id ? (
                  <input
                    type='text'
                    name='vorname'
                    value={editUser.vorname}
                    onChange={(event) => setEditUser({ ...editUser, vorname: event.target.value })}
                  />
                ) : (
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.vorname}</p>
                )}
              </div>
              <div className='ProfilName-Teil'>
                <h2>Nachname: </h2>
                {editUserId === user._id ? (
                  <input
                    type='text'
                    name='nachname'
                    value={editUser.nachname}
                    onChange={(event) => setEditUser({ ...editUser, nachname: event.target.value })}
                  />
                ) : (
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;{user.nachname}</p>
                )}
              </div>
              <div className='ProfilName-Teil'>
                <h2>Geschlecht: </h2>
                {editUserId === user._id ? (
                  <input
                    type='text'
                    name='geschlecht'
                    value={editUser.geschlecht}
                    onChange={(event) => setEditUser({ ...editUser, geschlecht: event.target.value })}
                  />
                ) : (
                  <p>&nbsp;&nbsp;&nbsp;{user.geschlecht}</p>
                )}
              </div>
              <div className='ProfilName-Teil'>
                <h2>Studiengang: </h2>
                {editUserId === user._id ? (
                  <input
                    type='text'
                    name='studiengang'
                    value={editUser.studiengang}
                    onChange={(event) => setEditUser({ ...editUser, studiengang: event.target.value })}
                  />
                ) : (
                  <p>&nbsp;{user.studiengang}</p>
                )}
              </div>
              <div className='ProfilName-Teil'>
                <h2>Geburtstag: </h2>
                <p>&nbsp;&nbsp;&nbsp;{formatDate(user.geburtstag)}</p>
              </div>
              <div className='ProfilName-Teil'>
                <h2>Email: </h2>
                {editUserId === user._id ? (
                  <input
                    type='text'
                    name='email'
                    value={editUser.email}
                    onChange={(event) => setEditUser({ ...editUser, email: event.target.value })}
                  />
                ) : (
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.email}</p>
                )}
              </div>
              <div className='ProfilName-Teil'>
                <h2>Semester: </h2>
                <p>&nbsp;&nbsp;&nbsp;{semester}</p>
                <div className='ProfilButton'>
                  <div className='ButtonRow-Sem'>
                    <button onClick={decrementSemester}>-</button>
                    <button onClick={incrementSemester}>+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='ProfilButton'>
            <div className='ButtonRow'>
              
                <button onClick={handleEdit}>
                  Daten ändern
                </button>
             
              
                <button onClick={handleUpdate}>
                  Änderungen speichern
                </button>
         
            </div>
            <div className='ButtonRow'>
              <button>
                Passwort ändern
              </button>
              <button onClick={() => handleDelete(user._id)}>
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
