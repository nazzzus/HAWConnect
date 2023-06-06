import React from 'react';
import TableRow from '../components/TableRow';
import '../styles/Kurse.css'
import PRO from '../images/Module/Sem5/PRO.png'
import RE from '../images/Module/Sem5/RE.png'
import WI3 from '../images/Module/Sem5/WI3.png'
import WIS from '../images/Module/Sem5/WIS.png'
import GW1 from '../images/Module/Sem5/GW1.png'
import WP1 from '../images/Module/Sem5/WP1.png'

const data = [
  { module: 'Projekt', belegt: false, bestanden: false, image: PRO },
  { module: 'Recht', belegt: true, bestanden: false, image: RE },
  { module: 'Wirtschaftsinformatik III', belegt: false, bestanden: true, image: WI3 },
  { module: 'Seminar Wirtschaftsinformatik', belegt: false, bestanden: false, image: WIS },
  { module: 'Gesellschaftswisschenschaften I', belegt: true, bestanden: false, image: GW1 },
  { module: 'Wahlpflichtmodul I', belegt: true, bestanden: false, image: WP1 },
];
  

function Kurse() {
  return (
    <div className='sem-main'>
    <div className='sem-banner'>
      <h1>Semester 5</h1>
      <h2>Deine Kurse aus dem fünften Semester</h2>
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