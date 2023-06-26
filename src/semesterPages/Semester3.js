import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableRow3 from '../components/TableRow3';
import '../styles/Kurse.css';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useGetUserId } from "../hooks/useGetUserId";
import AD from '../images/Module/Sem3/AD.png'
import WS from '../images/Module/Sem3/WS.png'
import WI1 from '../images/Module/Sem3/WI1.png'
import SEA1 from '../images/Module/Sem3/SEA1.png'
import BWL3 from '../images/Module/Sem3/BWL3.png'

const data = [
  { module: 'Wahrscheinlichkeitsrechnung & Statistik',image: WS },
  { module: 'Algorithmen und Datenstrukturen',  image: AD },
  { module: 'Software-Engineering und Software-Architektur I', image: SEA1 },
  { module: 'Wirtschaftsinformatik 1',  image: WI1 },
  { module: 'Betriebswirtschaftslehre III',  image: BWL3 },
];

function Kurse() {
  const userId = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/sem3/get/${userId}`, 
        {
          headers: { authorization: cookies.access_token },
        });
        console.log(response.data);  
        setModules(response.data);
      } catch (error) {
        console.log(error.response ? error.response.data : error.message);
      }
    };
  
    fetchModules();
  }, []);
  

  return (
    <div className='sem-main'>
      <div className='sem-banner'>
        <h1>Semester 3</h1>
        <h2>Deine Kurse aus dem zweiten Semester</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Module</th>
            <th>Belegt</th>
            <th>PVL erhalten</th>
            <th>Modul abgeschlossen</th>
            <th>Note</th>
            <th>Informationen</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((module, index) => (
            <TableRow3 key={index} module={module} image={data[index].image} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Kurse;
