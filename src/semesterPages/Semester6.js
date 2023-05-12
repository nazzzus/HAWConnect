import React from 'react';
import TableRow from '../components/TableRow';
import '../styles/Kurse.css'
import BA from '../images/Module/Sem6/BA.png'
import GW2 from '../images/Module/Sem6/GW2.png'
import WP2 from '../images/Module/Sem6/WP2.png'
import WP3 from '../images/Module/Sem6/WP3.png'

const data = [
  { module: 'Bachelorarbeit', belegt: false, bestanden: false, image: BA },
  { module: 'Gesellschaftswissenschaften II', belegt: true, bestanden: false, image: GW2 },
  { module: 'Wahlpflichtmodul II', belegt: false, bestanden: true, image: WP2 },
  { module: 'Wahlpflichtmodul III', belegt: false, bestanden: false, image: WP3 },
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