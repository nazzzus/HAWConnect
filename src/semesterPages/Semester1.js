import React, { useEffect, useState } from 'react';
import TableRow from '../components/TableRow';
import axios from 'axios';
import { useCookies } from "react-cookie";
import { useGetUserId } from "../hooks/useGetUserId";
import '../styles/Semester.css';

function Semester1() {
  const [semesterData, setSemesterData] = useState([]);
  const userId = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchSemesterData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/sem/user/${userId}`,
        {
          headers: { authorization: cookies.access_token },
        }
      );
        setSemesterData(response.data.sem1);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSemesterData();
  }, []);

  return (
    <div className="sem">
      <table>
        <thead>
          <tr>
            <th>Module</th>
            <th>Belegt</th>
            <th>Bestanden</th>
            <th>Note</th>
            <th>Informationen</th>
          </tr>
        </thead>
        <tbody>
          {semesterData.map((rowData, index) => (
            <TableRow
              key={index}
              module={rowData.module}
              belegt={rowData.belegt}
              bestanden={rowData.bestanden}
              image={rowData.image}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Semester1;
