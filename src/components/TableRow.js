import React, { useState } from 'react';

function TableRow({ module, belegt, bestanden, image }) {
  const [isBelegt, setIsBelegt] = useState(belegt);
  const [isBestanden, setIsBestanden] = useState(bestanden);
  const [isImageVisible, setIsImageVisible] = useState(false);

  const handleBelegtToggle = () => {
    if (!isBestanden) {
      setIsBelegt(!isBelegt);
    }
  };

  const handleBestandenToggle = () => {
    setIsBestanden(!isBestanden);
    if (isBelegt) {
      setIsBelegt(false);
    }
  };

  const handleImageClick = () => {
    setIsImageVisible(!isImageVisible);
  };

  return (
    <tr>
      <td>{module}</td>
      <td><button onClick={handleBelegtToggle}>{isBelegt ? '★' : '☆'}</button></td>
      <td><button onClick={handleBestandenToggle}>{isBestanden ? '✔' : '✘'}</button></td>
      <td><input type='text'></input> <button>Speichern</button></td>
      <td><button onClick={handleImageClick}>Mehr Informationen</button></td>
      {isImageVisible && <td><img src={image} alt="Bild" /></td>}
    </tr>
  );
}

export default TableRow;
