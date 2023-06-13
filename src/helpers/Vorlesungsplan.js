import React, { useEffect, useState } from 'react';
import '../styles/Pruefungsplan.css';
import axios from 'axios';

function Vorlesungsplan() {
    const [exams, setExams] = useState([]);

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await axios.get('http://localhost:3001/exam');
                setExams(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchExams();
    }, []);

    const startExamDate = new Date('2023-07-03');
    const endExamDate = new Date('2023-07-23');
    let currentExamDate = startExamDate;

    const examWeeks = [];

  while (currentExamDate <= endExamDate) {
    const examWeek = [];

    for (let i = 0; i < 7; i++) {
      const examDate = new Date(currentExamDate);
      examDate.setDate(examDate.getDate() + i);
      const examsOnDay = exams.filter((exam) => new Date(exam.datum).toDateString() === examDate.toDateString());
      examWeek.push({ date: examDate, exams: examsOnDay });
    }

    examWeeks.push(examWeek);
    currentExamDate.setDate(currentExamDate.getDate() + 7);
  }

    return (
        <div className='main-plan'>
            <h1>Prüfungsplan</h1>
            <h2>Für den Zeitraum der Prüfungsphase 03.07.2023 bis zum 23.07.2023.</h2>
            <div className='main-content'>
                {examWeeks.map((examWeek, index) => (
                    <div className='main-content-row' key={index}>
                        <div className='main-content-row-item'>
                            <p>{index === 0 ? 'Erste' : index === 1 ? 'Zweite' : 'Dritte'} Prüfungswoche</p>
                            <p>{examWeek[0].date.toLocaleDateString()} - {examWeek[6].date.toLocaleDateString()}</p>
                        </div>
                        {examWeek.map((examDay, index) => (
                            <div className='main-content-row-item' key={index}>
                                <div className='item-info'>
                                <strong><p>{examDay.date.toLocaleDateString(undefined, { weekday: 'long' })} - {examDay.date.toLocaleDateString()}</p></strong>
                                    {examDay.exams.length > 0 ? (
                                <div className="exam-info">
                                    {examDay.exams.map((exam, index) => (
                                     <div key={index}>
                                        <div className='exam-info-name'>  <strong><p>{exam.modul}</p> </strong></div>
                                        <div className='exam-info-rest'> 
                                        <p>Prüfer: {exam.prof}</p>
                                        <p>Raum: {exam.raum}</p>
                                        <p>Klausurart: {exam.art}</p>
                                        <p>Klausurtyp: {exam.typ}</p>
                                        </div>
                                        
                                    </div>
                                         ))}
                                    </div>
                                    ) : (
                                        <p><br /><br />Keine Prüfung an diesem Tag!</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Vorlesungsplan;