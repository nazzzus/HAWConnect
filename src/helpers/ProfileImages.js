import React, { useState, useEffect } from 'react';

const ProfileImages = () => {
  const [profileImages, setProfileImages] = useState([]);

  useEffect(() => {
    // Rufe die API-Route auf, um die Profilbilder abzurufen
    fetch('/pfp/profile-images')
      .then(response => response.json())
      .then(data => setProfileImages(data))
      .catch(error => console.error(error));
  }, []);

  const handleSelectImage = (imageId) => {
    const userId = '123'; // Hier müsstest du die Benutzer-ID entsprechend setzen

    // Rufe die API-Route auf, um das ausgewählte Profilbild für den Benutzer zu speichern
    fetch(`/pfp/users/${userId}/select-profile-image/${imageId}`, { method: 'POST' })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Profilbilder</h2>
      <ul>
        {profileImages.map(image => (
          <li key={image._id}>
            <img src={image.imagePath} alt={image.imageName} />
            <button onClick={() => handleSelectImage(image._id)}>Auswählen</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileImages;
