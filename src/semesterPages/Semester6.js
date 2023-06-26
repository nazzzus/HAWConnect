import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableRow6 from '../components/TableRow6';
import '../styles/Kurse.css';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useGetUserId } from "../hooks/useGetUserId";
import BA from '../images/Module/Sem6/BA.png'
import GW1 from '../images/Module/Sem6/GW1.png'
import GW2 from '../images/Module/Sem6/GW2.png'
import WP2 from '../images/Module/Sem6/WP2.png'
import WP3 from '../images/Module/Sem6/WP3.png'

const data = [
  { module: 'Bachelorarbeit', image: BA },
  { module: 'Wahlpflichtmodul II',  image: WP2 },
  { module: 'Wahlpflichtmodul III',  image: WP3 },
  { module: 'Gesellschaftswissenschaften I', image: GW1 },
  { module: 'Gesellschaftswissenschaften II', image: GW2 },
];

function Kurse() {
  const userId = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/sem6/get/${userId}`, 
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
        <h1>Semester 6</h1>
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
            <TableRow6 key={index} module={module} image={data[index].image} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Kurse;
