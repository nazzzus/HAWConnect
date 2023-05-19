import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Stundenplan = () => {
  const [schedule, setSchedule] = useState([]);
  const [userId, setUserId] = useState(''); // User-ID des aktuellen Benutzers

  useEffect(() => {
    fetchSchedule();
  }, [userId]);

  const fetchSchedule = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/splan/schedule/${userId}`);
      if (response.data) {
        setSchedule(response.data.subjects);
      } else {
        setSchedule([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleScheduleChange = (e, index, field) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[index][field] = e.target.value;
    setSchedule(updatedSchedule);
  };

  const saveSchedule = async () => {
    try {
      await axios.put(`http://localhost:3001/splan/schedule/${userId}`, { subjects: schedule });
      console.log('Stundenplan gespeichert!');
    } catch (error) {
      console.error(error);
    }
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
          {schedule.map((entry, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={entry.time}
                  onChange={(e) => handleScheduleChange(e, index, 'time')}
                  placeholder="Uhrzeit"
                />
              </td>
              {entry.days.map((day, dayIndex) => (
                <td key={dayIndex + 1}>
                  <input
                    type="text"
                    value={day}
                    onChange={(e) => handleScheduleChange(e, index, 'days')}
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
};

export default Stundenplan;