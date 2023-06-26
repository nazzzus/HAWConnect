
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableRow4 from '../components/TableRow4';
import '../styles/Kurse.css';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useGetUserId } from "../hooks/useGetUserId";
import WI2 from '../images/Module/Sem4/WI2.png'
import SEA2 from '../images/Module/Sem4/SEA2.png'
import RB from '../images/Module/Sem4/RB.png'
import IN2 from '../images/Module/Sem4/IN2.png'
import BWL4 from '../images/Module/Sem4/BWL4.png'

const data = [
  { module: 'Wirtschaftsinformatik II', image: WI2 },
  { module: 'Software-Engineering und Software-Architektur II',  image: SEA2 },
  { module: 'Rechnernetze und Betriebssysteme',  image: RB },
  { module: 'Informationssysteme 2', image: IN2 },
  { module: 'Betriebswirtschaftslehre IV', image: BWL4 },
];

function Kurse() {
  const userId = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/sem4/get/${userId}`, 
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
        <h1>Semester 4</h1>
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
            <TableRow4 key={index} module={module} image={data[index].image} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Kurse;
