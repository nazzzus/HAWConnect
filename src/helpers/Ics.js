import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Cookies, useCookies } from 'react-cookie';
import { useGetUserId } from '../hooks/useGetUserId';


const UploadICS = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const userId = useGetUserId();
    const [cookies, _] = useCookies(["access_token"]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
      // HTTP-Anfrage an Backend senden, um ICS-Daten abzurufen
      axios.get(`http://localhost:3001/ics-events/${userId}`,
      {
        headers: { authorization: cookies.access_token },
      })
        .then(response => {
          setEvents(response.data);
        })
        .catch(error => {
          console.error("Fehler beim Abrufen der ICS-Daten:", error);
        });
    }, []);

    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleUpload = async () => {
      if (!selectedFile) {
        return;
      }
  
      try {
        const formData = new FormData();
        formData.append("icsFile", selectedFile);
  
        await axios.post("http://localhost:3001/ics/upload-ics", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        // Erfolgreiches Hochladen der Datei
        console.log("ICS file uploaded successfully");
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