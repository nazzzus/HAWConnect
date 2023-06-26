
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableRow5 from '../components/TableRow5';
import '../styles/Kurse.css';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useGetUserId } from "../hooks/useGetUserId";
import PRO from '../images/Module/Sem5/PRO.png'
import RE from '../images/Module/Sem5/RE.png'
import WI3 from '../images/Module/Sem5/WI3.png'
import WIS from '../images/Module/Sem5/WIS.png'
import WP1 from '../images/Module/Sem5/WP1.png'

const data = [
  { module: 'Projekt', image: PRO },
  { module: 'Seminar Wirtschaftsinformatik',  image: WIS },
  { module: 'Wirtschaftsinformatik III',  image: WI3 },
  { module: 'Recht', image: RE },
  { module: 'Wahlpflichtmodul I', image: WP1 },
];

function Kurse() {
  const userId = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/sem5/get/${userId}`, 
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
        <h1>Semester 5</h1>
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
            <TableRow5 key={index} module={module} image={data[index].image} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Kurse;
