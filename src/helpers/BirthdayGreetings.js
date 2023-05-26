//http://localhost:3001/auth/birthday/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useGetUserId } from '../hooks/useGetUserId';

const BirthdayGreetings = () => {
  const [birthdayMessage, setBirthdayMessage] = useState('');
  const userId = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchBirthdayMessage = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/notis/birthday/${userId}`, {
          headers: {
            Authorization: `Bearer ${cookies.access_token}` // Setzen Sie den access_token im Header
          }
        });
        setBirthdayMessage(response.data.message); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchBirthdayMessage();
  }, [userId, cookies.access_token]);
  
  

  return (
    <div className='geburtstag'>
      {<p>{birthdayMessage}</p>}
    </div>
  );
};

export default BirthdayGreetings;