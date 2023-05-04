import React, { useState } from 'react';
import '../styles/Stundenplan.css';

function Stundenplan() {
  const [schedule, setSchedule] = useState([
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '']
  ]);

  const handleScheduleChange = (e, row, col) => {
    const newSchedule = [...schedule];
    newSchedule[row][col] = e.target.value;
    setSchedule(newSchedule);
  };

  const saveSchedule = () => {
    fetch('http://example.com/schedules', {
      method: 'POST',
      body: JSON.stringify(schedule),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  return (
    <div className="stundenplan-container">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Montag</th>
            <th>Dienstag</th>
            <th>Mittwoch</th>
            <th>Donnerstag</th>
            <th>Freitag</th>
            <th>Samstag</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((row, i) => (
            <tr key={i}>
              <td>
                <input
                  type="text"
                  value={row[0]}
                  onChange={e => handleScheduleChange(e, i, 0)}
                  placeholder="Uhrzeit"
                />
              </td>
              {row.slice(1).map((col, j) => (
                <td key={j + 1}>
                  <input
                    type="text"
                    value={col}
                    onChange={e => handleScheduleChange(e, i, j + 1)}
                    placeholder="Eintrag"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={saveSchedule}>Speichern</button>
    </div>
  );
}

export default Stundenplan;
