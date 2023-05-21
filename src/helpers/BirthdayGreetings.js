//http://localhost:3001/auth/birthday/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const BirthdayGreetings = () => {
  const [birthdayMessage, setBirthdayMessage] = useState('');
  const [cookies, _] = useCookies(['access_token']);

  useEffect(() => {
    const fetchBirthdayMessage = async () => {
      try {
        const response = await axios.get('http://localhost:3001/auth/birthday', {
          headers: {
            Authorization: cookies.access_token // Annahme: Der JWT-Token wird als "access_token" im Cookie gespeichert
          }
        });

        setBirthdayMessage(response.data.message);
      } catch (error) {
        console.error(error);
        // Fehlerbehandlung
      }
    };

    fetchBirthdayMessage();
  }, []);

  return (
    <div>
      <h2>Geburtstagsglückwunsch</h2>
      {birthdayMessage && <p>{birthdayMessage}</p>}
    </div>
  );
};

export default BirthdayGreetings;