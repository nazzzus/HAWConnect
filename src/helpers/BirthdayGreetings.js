import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useGetUserId } from '../hooks/useGetUserId';

const BirthdayGreetings = () => {
  const [birthdayMessage, setBirthdayMessage] = useState('');
  const [examMessage, setExamMessage] = useState('');
  const userId = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchBirthdayMessage = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/notis/birthday/${userId}`, {
          headers: {
            Authorization: `Bearer ${cookies.access_token}` 
          }
        });
        setBirthdayMessage(response.data.message); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchBirthdayMessage();
  }, [userId, cookies.access_token]);

  useEffect(() => {
    const fetchExamMessage = async () => {
      try {
        const response = await axios.get('http://localhost:3001/notis/exams', {
          headers: {
            Authorization: `Bearer ${cookies.access_token}` 
          }
        });
        setExamMessage(response.data.message); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchExamMessage();
  }, [userId, cookies.access_token]);
  
  

  return (
    <div className='geburtstag'>
      {<p>{birthdayMessage}</p>}
      {<p>{examMessage}</p>}
    </div>
  );
};

export default BirthdayGreetings;