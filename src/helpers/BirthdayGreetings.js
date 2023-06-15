import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useGetUserId } from '../hooks/useGetUserId';

const Notifications = () => {
  const [birthdayMessage, setBirthdayMessage] = useState('');
  const [examMessage, setExamMessage] = useState('');
  const userId = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);
  const [returnMessage, setReturnMessage] = useState('');
  const [returnTodayMessage, setReturnTodayMessage] = useState('');

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

    const fetchExamMessage = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/notis/exams/${userId}`, {
          headers: {
            Authorization: `Bearer ${cookies.access_token}` 
          }
        });
        setExamMessage(response.data.message); 
      } catch (error) {
        console.error(error);
      }
    };
    

    const fetchReturnMessage = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/notis/books/comingdue/${userId}`, {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`
          }
        });
        if (response.data.message) {
          setReturnMessage(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchReturnDayMessage = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/notis/books/comingdueToday/${userId}`, {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`
          }
        });
        if (response.data.message) {
          setReturnTodayMessage(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchExamMessage();
    fetchReturnDayMessage();
    fetchBirthdayMessage();
    fetchReturnMessage();
  }, [userId, cookies.access_token]);

  return (
    <div>
      <div className='benachrichtigungenx'>
        <div className='benachrichtigungen-title'>
          <h1>Benachrichtigungen</h1>
        </div>
      <div className='benachrichtigungen-messages'>
      <p>{birthdayMessage && <div>{birthdayMessage}</div>}</p>
      <p>{returnTodayMessage && <div>{returnTodayMessage}</div>}</p>
      <p>{returnMessage && <div>{returnMessage}</div>}</p>
      <p>{examMessage && <div>{examMessage}</div>}</p>
      </div>
    </div>
    </div>
  );
}

export default Notifications;
