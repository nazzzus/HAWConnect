import React, { useState } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId";
import { useNavigate } from "react-router-dom";

const ProfileImages = () => {
  const userId = useGetUserId();
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('profileImage', selectedImage);
      const response = await axios.post(`http://localhost:3001/pfp/add/${userId}`, formData);
      setMessage(response.data.message);
      navigate("/profil");
      window.location.reload();
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="pfp-form">
      <form onSubmit={handleSubmit}>
       <div className="pfp-sinnlos"> 
       <label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        </div>
        <div className="pfp-button">
          <button type="submit">Profilbild hochladen</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProfileImages;
