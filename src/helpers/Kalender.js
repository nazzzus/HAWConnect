import React, { useState } from 'react';
import '../styles/Kalender.css';

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const onDateClick = day => {
    setSelectedDate(day);
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth => new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(currentMonth => new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = date => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCells = () => {
    const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const rows = [];
    let cells = [];
    let day = 1;
  
    // Füge leere Zellen bis zum ersten Tag des Monats hinzu
    for (let i = 0; i < firstDayOfMonth(monthStart); i++) {
      cells.push(<td key={`empty-${i}`} className="empty"></td>);
    }
  
    // Füge Zellen für jeden Tag des Monats hinzu
    for (day = 1; day <= monthEnd.getDate(); day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const weekDay = date.getDay();
  
      // Füge leere Zellen am Anfang einer neuen Woche hinzu
      if (weekDay === 0) {
        rows.push(<tr key={`week-${day}`} className="week">{cells}</tr>);
        cells = [];
      }
  
      // Füge die Zelle für den aktuellen Tag hinzu
      cells.push(
        <td
          key={`day-${day}`}
          className={`day ${selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === currentMonth.getMonth() ? 'selected' : ''}`}
          onClick={() => onDateClick(date)}
        >
          {day}
        </td>
      );
    }
  
    // Füge leere Zellen am Ende einer neuen Woche hinzu
    for (let i = 0; i < 7 - cells.length; i++) {
      cells.push(<td key={`empty-${i + day}`} className="empty"></td>);
    }
  
    rows.push(<tr key={`week-${day}`} className="week">{cells}</tr>);
  
    return rows;
  };
  

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevMonth}>Prev</button>
        <h1>{`${currentMonth.toLocaleString('default', { month: 'long' })} ${currentMonth.getFullYear()}`}</h1>
        <button onClick={nextMonth}>Next</button>
      </div>
      <table className="calendar">
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>{renderCells()}</tbody>
      </table>
    </div>
  );
}

export default Calendar;
