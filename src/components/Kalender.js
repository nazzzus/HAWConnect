import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import AddEventModal from '../helpers/AddEvent';
import axios from 'axios';
import { useGetUserId } from "../hooks/useGetUserId";
import { useCookies } from "react-cookie";
import moment from 'moment';
import '@fullcalendar/core/locales/de';


const Kalender = () => {
  const userId = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [deleteEvent, setDeleteEvent] = useState(null);
  const eventTimeFormat = {
    hour: 'numeric',
    minute: '2-digit',
    meridiem: false
  };

  const calendarRef = useRef(null);

  const handleEventClick = (info) => {
    const event = info.event;
  
    // Set the event to edit
    setEditEvent(event);
  
    // Set the event to delete
    setDeleteEvent(event);
  };
  


  const handleEventEdit = async (event) => {
    try {
      await axios.put(`http://localhost:3001/events/update-event/${event.id}`, {
        title: event.title,
        start: moment(event.start).toDate(),
        end: moment(event.end).toDate(),
      }, {
        headers: { authorization: cookies.access_token },
      });

      // Update the events in the state or refetch the events from the server
      // based on your implementation
    } catch (err) {
      console.error(err);
    }
  };

  const handleEventDelete = async (event) => {
    try {
      await axios.delete(`http://localhost:3001/events/delete-event/${event.id}`, {
        headers: { authorization: cookies.access_token },
      });

      // Update the events in the state or refetch the events from the server
      // based on your implementation
    } catch (err) {
      console.error(err);
    }
  };

  const onEventAdded = event => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({
      start: moment(event.start, 'YYYY-MM-DDTHH:mm:ss').toDate(),
      end: moment(event.end, 'YYYY-MM-DDTHH:mm:ss').toDate(),
      title: event.title,
      
    });
  }
  

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get(`http://localhost:3001/events/get-events/${userId}`, {
          headers: {
            authorization: cookies.access_token
          }
        });
        setEvents(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchEvents();
  }, [userId, cookies.access_token]);

  async function handleEventAdd(data) {
    try {
      await axios.post('http://localhost:3001/events/create-event', data.event, {
        headers: {
          authorization: cookies.access_token
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  const handleEventDidMount = (eventInfo) => {
    const event = eventInfo.event;
    const startTime = moment(event.start).format('H:mm');
    const endTime = moment(event.end).format('H:mm');
    const timeRange = `${startTime}-${endTime}`;
    event.setExtendedProp('timeRange', timeRange);
  };
  

  return (
    <section>
      <button onClick={() => setModalOpen(true)}>Add Event</button>
      <div style={{ position: 'relative', zIndex: 0 }}>
        <FullCalendar
          locale="de"
          ref={calendarRef}
          events={events}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          eventClick={handleEventClick}
          initialView={'dayGridMonth'}
          headerToolbar={{
            start: 'today prev,next',
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay',

          }}
          eventAdd={event => handleEventAdd(event)}
          eventTimeFormat={eventTimeFormat}
          eventDidMount={handleEventDidMount}
          eventContent={(eventInfo) => (
            <>
              <div>{eventInfo.event.extendedProps.timeRange}</div>
              <div>{eventInfo.event.title}</div>
            </>
          )}
        />

         {/* Add event modal */}
      <AddEventModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onEventAdded={event => onEventAdded(event)} />

      </div>
    </section>
  );
};

export default Kalender;