import React from 'react';
import TableRow from '../components/TableRow';
import '../styles/Kurse.css'
import IN1 from '../images/Module/Sem2/IN1.png'
import TH from '../images/Module/Sem2/TH.png'
import PM2 from '../images/Module/Sem2/PM2.png'
import QM from '../images/Module/Sem2/QM.png'
import BWL2 from '../images/Module/Sem2/BWL2.png'

const data = [
  { module: 'Informationssysteme I', belegt: false, bestanden: false, image: IN1 },
  { module: 'Theoretische Informatik', belegt: true, bestanden: false, image: TH },
  { module: 'Programmiermethodik II', belegt: false, bestanden: true, image: PM2 },
  { module: 'Quantitative Methoden', belegt: false, bestanden: false, image: QM },
  { module: 'Betriebswirtschaftslehre II', belegt: true, bestanden: false, image: BWL2 },
];
  

function Kurse() {
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