import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TableRow({ module, belegt, bestanden, pvlBestanden, image }) {
  const [isBelegt, setIsBelegt] = useState(belegt);
  const [isPvlBestanden, setIsPvlBestanden] = useState(pvlBestanden)
  const [isBestanden, setIsBestanden] = useState(bestanden);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setNote(null);
  }, [module]);

  const handleBelegtToggle = () => {
    if (!isBestanden && !isPvlBestanden) {
      setIsBelegt(!isBelegt);
    }
  };

  const handleBestandenToggle = () => {
    setIsBestanden(!isBestanden);
    if (isBelegt) {
      setIsBelegt(false);
    }
  };

  const handlePVLBestandenToggle = () => {
    setIsPvlBestanden(!isPvlBestanden);
    if (isBelegt) {
      setIsBelegt(false);
    }
  };

  const handleImageClick = () => {
    setIsImageVisible(!isImageVisible);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleNoteSave = async () => {
    if (!note) {
      return;
    }

    setIsLoading(true);

    try {
      // Hier API-Aufruf zum Speichern der Note
      await axios.put(`/sem2/${module._id}`, {
        note,
      });
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <tr>
      <td>{module.modulName}</td>
      <td><button onClick={handleBelegtToggle}>{isBelegt ? '★' : '☆'}</button></td>
      <td><button onClick={handlePVLBestandenToggle}>{isPvlBestanden ? '✔' : '✘'}</button></td>
      <td><button onClick={handleBestandenToggle}>{isBestanden ? '✔' : '✘'}</button></td>
      <td>
        <input
          type='text'
          value={note || ''}
          onChange={handleNoteChange}
          disabled={isLoading}
        />
        <button onClick={handleNoteSave} disabled={isLoading}>
          {isLoading ? 'Speichern...' : 'Speichern'}
        </button>
      </td>
      <td><button onClick={handleImageClick}>Mehr Informationen</button></td>
      {isImageVisible && <td><img src={image} alt="Bild" /></td>}
    </tr>
  );
}

export default TableRow;
