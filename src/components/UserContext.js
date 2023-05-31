import React, { createContext, useState, useEffect } from 'react';
import { useGetUserId } from '../hooks/useGetUserId';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const userId = useGetUserId();
  
    useEffect(() => {
          fetchUserRole();
        }, []);
      
        const fetchUserRole = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/notis/user/${userId}`,{
            });
            setRole(response.data.role);
          } catch (error) {
            console.error(error);
          }
    }
  
    // Stellen Sie sowohl den user als auch die userRole im Context bereit
    return (
      <UserContext.Provider value={{ user, setUser, role }}>
        {children}
      </UserContext.Provider>
    );
  };
  