import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableRow1 from '../components/TableRow1';
import '../styles/Kurse.css';
import PT from '../images/Module/Sem1/PT.png';
import GWI from '../images/Module/Sem1/GWI.png';
import PM1 from '../images/Module/Sem1/PM1.png';
import GM from '../images/Module/Sem1/GM.png';
import BWL1 from '../images/Module/Sem1/BWL1.png';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useGetUserId } from "../hooks/useGetUserId";
import Swal from 'sweetalert2';

const data = [
  { module: 'Grundlagen der Mathematik', image: GM },
  { module: 'Programmiermethodik II',  image: GWI },
  { module: 'Quantitative Methoden',  image: PM1 },
  { module: 'Theoretische Informatik', image: PT },
  { module: 'Betriebswirtschaftslehre II', image: BWL1 },
];

function Kurse() {
  const userId = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/sem1/get/${userId}`, 
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
        <h1>Semester 1</h1>
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
            <TableRow1 key={index} module={module} image={data[index].image} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Kurse;
