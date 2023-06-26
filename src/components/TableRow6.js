import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TableRow6({ module, image }) {
  const [isBelegt, setIsBelegt] = useState(module.belegt);
  const [isPvlBestanden, setIsPvlBestanden] = useState(module.pvlErhalten)
  const [isBestanden, setIsBestanden] = useState(module.modulBestanden);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [note, setNote] = useState(module.note);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setNote(module.note);
  }, [module]);


  const handleBelegtToggle = async () => {
    if (!isBestanden && !isPvlBestanden) {
      setIsBelegt(!isBelegt);
      try {
        await axios.put(`http://localhost:3001/sem6/toggle-belegt/${module._id}`, {
          belegt: !isBelegt,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };
  
  const handleImageClick = () => {
    setIsImageVisible(!isImageVisible);
  };

  const handlePVLBestandenToggle = async () => {
    setIsPvlBestanden(!isPvlBestanden);
    if (isBelegt) {
      setIsBelegt(false);
    }
    try {
      await axios.put(`http://localhost:3001/sem6/toggle-pvl/${module._id}`, {
        pvlErhalten: !isPvlBestanden,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleBestandenToggle = async () => {
    setIsBestanden(!isBestanden);
    if (isBelegt) {
      setIsBelegt(false);
    }
    try {
      await axios.put(`http://localhost:3001/sem6/toggle-bestanden/${module._id}`, {
        modulBestanden: !isBestanden,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleNoteEditToggle = () => {
    setIsEditing(!isEditing);
  }

  const handleNoteSave = async () => {
    if (!note) {
      return;
    }
    setIsLoading(true);
    try {
      await axios.put(`http://localhost:3001/sem6/update-note/${module._id}`, {
        note,
      });
    } catch (error) {
      console.log(error);
    }
    setIsEditing(false);
    setIsLoading(false);
  };
  
  return (
    <tr>
      <td>{module.name}</td>
      <td><button onClick={handleBelegtToggle}>{isBelegt ? '★' : '☆'}</button></td>
      <td><button onClick={handlePVLBestandenToggle}>{isPvlBestanden ? '✔' : '✘'}</button></td>
      <td><button onClick={handleBestandenToggle}>{isBestanden ? '✔' : '✘'}</button></td>
      <td>
        <input
          type='text'
          value={note || ''}
          onChange={handleNoteChange}
          disabled={!isEditing || isLoading}
        />
        <button onClick={isEditing ? handleNoteSave : handleNoteEditToggle} disabled={isLoading}>
          {isEditing ? (isLoading ? 'Speichern...' : 'Speichern') : 'Bearbeiten'}
        </button>
      </td>
      <td><button onClick={handleImageClick}>Mehr Informationen</button></td>
      {isImageVisible && <td><img src={image} alt="Bild" /></td>}
    </tr>
  );
}

export default TableRow6;