import React from 'react';
import TableRow from '../components/TableRow';
import '../styles/Kurse.css'
import AD from '../images/Module/Sem3/AD.png'
import WS from '../images/Module/Sem3/WS.png'
import WI1 from '../images/Module/Sem3/WI1.png'
import SEA1 from '../images/Module/Sem3/SEA1.png'
import BWL3 from '../images/Module/Sem3/BWL3.png'

const data = [
  { module: 'Algorithmen und Datenstrukturen', belegt: false, bestanden: false, image: AD },
  { module: 'Wahrscheinlichkeitsrechnung & Statistik', belegt: true, bestanden: false, image: WS },
  { module: 'Wirtschaftsinformatik 1', belegt: false, bestanden: true, image: WI1 },
  { module: 'Software-Engineering und Software-Architektur I', belegt: false, bestanden: false, image: SEA1 },
  { module: 'Betriebswirtschaftslehre III', belegt: true, bestanden: false, image: BWL3 },
];
  

function Kurse() {
  return (
    <div className='sem-main'>
    <div className='sem-banner'>
      <h1>Semester 3</h1>
      <h2>Deine Kurse aus dem dritten Semester</h2>
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