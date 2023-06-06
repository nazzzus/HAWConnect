import React from 'react';
import TableRow from '../components/TableRow';
import '../styles/Kurse.css'
import WI2 from '../images/Module/Sem4/WI2.png'
import SEA2 from '../images/Module/Sem4/SEA2.png'
import RB from '../images/Module/Sem4/RB.png'
import IN2 from '../images/Module/Sem4/IN2.png'
import BWL4 from '../images/Module/Sem4/BWL4.png'

const data = [
  { module: 'Wirtschaftsinformatik II', belegt: false, bestanden: false, image: WI2 },
  { module: 'Software-Engineering und Software-Architektur II', belegt: true, bestanden: false, image: SEA2 },
  { module: 'Rechnernetze und Betriebssysteme', belegt: false, bestanden: true, image: RB },
  { module: 'Informationssysteme 2', belegt: false, bestanden: false, image: IN2 },
  { module: 'Betriebswirtschaftslehre IV', belegt: true, bestanden: false, image: BWL4 },
];
  

function Kurse() {
  return (
    <div className='sem-main'>
    <div className='sem-banner'>
      <h1>Semester 4</h1>
      <h2>Deine Kurse aus dem vierten Semester</h2>
    </div>
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
        {data.map((rowData, index) => (
          <TableRow key={index} {...rowData} />
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default Kurse