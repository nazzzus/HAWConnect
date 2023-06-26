import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useGetUserId } from '../hooks/useGetUserId';

const UploadICS = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const userId = useGetUserId();
  const [cookies] = useCookies(["access_token"]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/events/get-events/${userId}`, {
          headers: {
            authorization: cookies.access_token
          }
        });
        setEvents(response.data);
      } catch (error) {
        console.error("Fehler beim Abrufen der ICS-Daten:", error);
      }
    }

    fetchEvents();
  }, [userId, cookies.access_token]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadICS = async (icsFile) => {
    try {
      const formData = new FormData();
      formData.append("icsFile", icsFile);
      formData.append("userOwner", userId); // Hier den `userOwner`-Wert setzen
  
      await axios.post("http://localhost:3001/ics/upload-ics", formData, {
        headers: {
          authorization: cookies.access_token,
          "Content-Type": "multipart/form-data"
        }
      });
  
      console.log("ICS-Datei erfolgreich hochgeladen");
    } catch (error) {
      console.error("Fehler beim Hochladen der ICS-Datei:", error);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }
  
    try {
      await handleUploadICS(selectedFile);
    } catch (error) {
      console.error("Fehler beim Hochladen der ICS-Datei:", error);
    }
  };

  return (
    <div>
      <input type="file" accept=".ics" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload ICS</button>
    </div>
  );
};

export default UploadICS;
