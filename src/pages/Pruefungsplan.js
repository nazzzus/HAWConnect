import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import { useGetUserId } from "../hooks/useGetUserId";
import { useCookies } from "react-cookie";
import moment from 'moment';
import Swal from 'sweetalert2';
import '@fullcalendar/core/locales/de';
import '../styles/Pruefungsplan.css';

const Pruefungsplan = () => {
  const userId = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [deleteEvent, setDeleteEvent] = useState(null);
  const [exams, setExams] = useState([]);
  const [calendarKey, setCalendarKey] = useState(Date.now()); // Neues State für das Key-Attribut

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('http://localhost:3001/exam');
        const convertedEvents = convertExamsToEvents(response.data);
        setExams(convertedEvents);
      } catch (err) {
        console.log(err);
      }
    };

    fetchExams();
  }, []);

  const convertExamsToEvents = (exams) => {
    return exams.map((exam) => {
      return {
        id: exam._id,
        title: exam.modul,
        start: moment(exam.datum).toDate(),
        end: moment(exam.datum).toDate(),
        extendedProps: {
          art: exam.art,
          typ: exam.typ,
          prof: exam.prof,
          raum: exam.raum,
          markedBy: exam.markedBy || [],
        },
        classNames: exam.markedBy.includes(userId) ? 'marked-event' : '',
      };
    });
  };

  const handleEventClick = (eventInfo) => {
    const { title, extendedProps } = eventInfo.event;
    const { art, typ, prof, raum, markedBy } = extendedProps;
    const isMarked = markedBy.includes(userId);

    Swal.fire({
      title,
      html: `
        <strong>Art:</strong> ${art}<br>
        <strong>Typ:</strong> ${typ}<br>
        <strong>Prof:</strong> ${prof}<br>
        <strong>Raum:</strong> Steht nicht fest <br>
        <strong>Markiert:</strong> ${isMarked ? 'Ja' : 'Nein'}
      `,
      showCloseButton: true,
      confirmButtonText: isMarked ? 'Markierung aufheben' : 'Markieren',
    }).then((result) => {
      if (result.isConfirmed) {
        const mark = !isMarked;

        axios
          .put(`http://localhost:3001/exam/mark/${eventInfo.event.id}`, {
            userId,
            mark,
          })
          .then(() => {
            const updatedExams = exams.map((exam) => {
              if (exam.id === eventInfo.event.id) {
                return {
                  ...exam,
                  extendedProps: {
                    ...exam.extendedProps,
                    markedBy: mark
                      ? [...exam.extendedProps.markedBy, userId]
                      : exam.extendedProps.markedBy.filter((markedUserId) => markedUserId !== userId),
                  },
                  classNames: mark ? 'marked-event' : '',
                };
              }
              return exam;
            });

            setExams(updatedExams);
            setCalendarKey(Date.now()); // Key-Attribut aktualisieren, um die Komponente neu zu rendern
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const eventTimeFormat = {
    hour: 'numeric',
    minute: '2-digit',
    meridiem: false,
  };

  const calendarRef = useRef(null);

  return (
    <section>
      <div className='sem-banner'>
        <h1>Prüfungsplan</h1>
        <h2>Für das aktuelle Semester</h2>
      </div>
      <div className='pplan-button'></div>

      <div style={{ position: 'relative', zIndex: 0 }}>
        <FullCalendar
          key={calendarKey} // Key-Attribut verwenden
          locale='de'
          ref={calendarRef}
          events={exams}
          eventClick={handleEventClick}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView='dayGridMonth'
          headerToolbar={{
            start: 'today prev,next',
            center: 'title',
            end: 'dayGridMonth',
          }}
          eventTimeFormat={eventTimeFormat}
          eventContent={(eventInfo) => (
            <>
              <div>{eventInfo.event.extendedProps.art}</div>
              <div>{eventInfo.event.title}</div>
            </>
          )}
          eventClassNames='custom-event'
        />
      </div>
    </section>
  );
};

export default Pruefungsplan;
