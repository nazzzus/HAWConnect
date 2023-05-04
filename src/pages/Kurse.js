import React from 'react';
import TableRow from '../components/TableRow';
import '../styles/Kurse.css'
import GM from '../images/Module/Sem1/GM.png'
import GWI from '../images/Module/Sem1/GWI.png'
import PM1 from '../images/Module/Sem1/PM1.png'
import PT from '../images/Module/Sem1/PT.png'
import BWL1 from '../images/Module/Sem1/BWL1.png'

const data = [
  { module: 'Grundlagen der Mathematik', belegt: false, bestanden: false, image: GM },
  { module: 'Grundlagen der Wirtschaftsinformatik', belegt: true, bestanden: false, image: GWI },
  { module: 'Programmiermethodik I', belegt: false, bestanden: true, image: PM1 },
  { module: 'Programmiertechnik', belegt: false, bestanden: false, image: PT },
  { module: 'Betriebswirtschaft I', belegt: true, bestanden: false, image: BWL1 },
];
  

function Kurse() {
  return (
    <table>
      <thead>
        <tr>
          <th>Module</th>
          <th>Belegt</th>
          <th>Bestanden</th>
          <th>Informationen</th>
        </tr>
      </thead>
      <tbody>
        {data.map((rowData, index) => (
          <TableRow key={index} {...rowData} />
        ))}
      </tbody>
    </table>
  );
}

export default Kurse