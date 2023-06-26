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
import Ics from '../helpers/Ics';

const Kalender = () => {
  const userId = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);
  const eventTimeFormat = {
    hour: 'numeric',
    minute: '2-digit',
    meridiem: false
  };

  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/ics/ics-events/${userId}`, {
          headers: {
            authorization: cookies.access_token
          }
        });

        const uniqueEvents = filterDuplicateEvents(response.data);
        setEvents(uniqueEvents);
      } catch (error) {
        console.error("Fehler beim Abrufen der ICS-Daten:", error);
      }
    }

    fetchEvents();
  }, [userId, cookies.access_token]);

  const filterDuplicateEvents = (events) => {
    const uniqueEvents = [];
    const eventMap = new Map();

    for (const event of events) {
      const eventKey = `${event.title}-${event.start}-${event.end}`;

      if (!eventMap.has(eventKey)) {
        eventMap.set(eventKey, true);
        uniqueEvents.push(event);
      }
    }

    return uniqueEvents;
  };

  return (
    <section>
      <div className='sem-banner'>
        <h1>Stundenplan</h1>
        <h2>Für das aktuelle Semester</h2>
      </div>
      <div className='splan-buttons'>
        <Ics />
      </div>
      <div style={{ position: 'relative', zIndex: 0 }}>
        <FullCalendar
          locale="de"
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={'timeGridWeek'}
          slotMinTime="08:00:00" // Die früheste Uhrzeit, die angezeigt werden soll
          slotMaxTime="22:00:00" // Die späteste Uhrzeit, die angezeigt werden soll
          slotDuration="00:30:00" // Die Dauer eines Zeitslots
          slotLabelInterval="01:00" // Intervall für die Anzeige der Uhrzeitlabels
          slotLabelFormat={{
            hour: "numeric",
            minute: "2-digit",
            omitZeroMinute: false,
            meridiem: "short",
          }} // Das Format für die Anzeige der Uhrzeitlabels
          headerToolbar={{
            start: 'today prev,next',
            center: 'title',
          }}
          eventTimeFormat={eventTimeFormat}
          events={events} // Verwende die gefilterten Events

        />
      </div>
    </section>
  );
};

export default Kalender;
