import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useGetUserId } from '../hooks/useGetUserId';

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
    <div>
      <h2>User Profile</h2>
      <p>Username: {user.username}</p>
      <p>Vorname: {user.vorname}</p>
      <p>Nachname: {user.nachname}</p>
      <p>Geschlecht: {user.geschlecht}</p>
      <p>Studiengang: {user.studiengang}</p>
      <p>Geburtstag: {formatDate(user.geburtstag)}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profil;
