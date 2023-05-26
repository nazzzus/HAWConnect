import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId";

const ProfileImages = () => {
  const userId = useGetUserId();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchProfileImage();
  }, []);

  const fetchProfileImage = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/pfp/image/${userId}`, {
        responseType: 'blob',
      });
      setSelectedImage(URL.createObjectURL(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pfp-img">
      <img src={selectedImage} alt="Profile Image" />
    </div>
  );
};

export default ProfileImages;