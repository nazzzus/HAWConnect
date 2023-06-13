import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableRow from '../components/TableRow';
import '../styles/Kurse.css';
import IN1 from '../images/Module/Sem2/IN1.png';
import TH from '../images/Module/Sem2/TH.png';
import PM2 from '../images/Module/Sem2/PM2.png';
import QM from '../images/Module/Sem2/QM.png';
import BWL2 from '../images/Module/Sem2/BWL2.png';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useGetUserId } from "../hooks/useGetUserId";
import Swal from 'sweetalert2';

const data = [
  { module: 'Informationssysteme I', image: IN1 },
  { module: 'Theoretische Informatik', image: TH },
  { module: 'Programmiermethodik II',  image: PM2 },
  { module: 'Quantitative Methoden',  image: QM },
  { module: 'Betriebswirtschaftslehre II', image: BWL2 },
];

function Kurse() {
  const userId = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get('http://localhost:3001/sem2', 
        {
          headers: { authorization: cookies.access_token },
        });
        setModules(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchModules();
  }, []);

  return (
    <div className='sem-main'>
      <div className='sem-banner'>
        <h1>Semester 2</h1>
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
            <TableRow key={index} module={module} image={data[index].image} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Kurse;
