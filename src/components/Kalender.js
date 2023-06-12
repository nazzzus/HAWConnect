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
import Swal from 'sweetalert2';
import '@fullcalendar/core/locales/de';
import '../styles/Modal.css'; // Importieren Sie das CSS-Datei für das Modal-Styling

const Kalender = () => {
  const userId = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const eventTimeFormat = {
    hour: 'numeric',
    minute: '2-digit',
    meridiem: false
  };
  const calendarRef = useRef(null);

  const handleEventClick = (info) => {
    const event = info.event;
  
    console.log("hallo" + event.id + "x  x  s" + info.event); 
    console.log("Event ID: " + event.extendedProps._id);
    console.log("Event Objekt:", event);

    Swal.fire({
      title: 'Wählen Sie eine Option',
      input: 'select',
      inputOptions: {
        option1: 'Termin löschen',
        option2: 'Termin bearbeiten',
      },
      inputPlaceholder: 'Wählen Sie eine Option',
      showCancelButton: true,
      cancelButtonText: 'Abbrechen',
      confirmButtonText: 'Auswählen'
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedOption = result.value;
        if (selectedOption === 'option1') {
          handleEventDelete(event.extendedProps._id);
        } else if (selectedOption === 'option2') {
          // Handle event edit
        }
      }
    });
  };


  
 
  
  
  const handleEventDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:3001/events/delete-event/${eventId}`, {
        headers: { authorization: cookies.access_token },
      });

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Der Termin wurde gelöscht!',
        showConfirmButton: false,
        timer: 1500
      })        
      const updatedEventList = events.filter((event) => event._id !== eventId);
      setEvents(updatedEventList);
      // Update the events in the state or refetch the events from the server
      // based on your implementation
    } catch (err) {
      console.error(err);
    }
  };
  
  const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})


  
  

  const handleEventEdit = async (eventId) => {
    try {
      await axios.put(`http://localhost:3001/events/update-event/${eventId}`, {
        title: eventId.title,
        start: moment(eventId.start).toDate(),
        end: moment(eventId.end).toDate(),
      }, {
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
  };

  useEffect(() => {
    const fetchEvents = async () => {
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
    };
    fetchEvents();
  }, [events.userOwner, cookies.access_token]);

  

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

  const handleDateClick = (arg) => {
    Swal.fire({
      title: 'Bist du dir sicher?',
      text: "Willst du einen Termin hinzufügen?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ja, Termin hinzufügen'
    }).then((result) => {
      if (result.isConfirmed) {
        const clickedDate = moment(arg.date).toDate();
        setSelectedDate(clickedDate);
        setModalOpen(true);
      }
    })
  };

  return (
    <section>
      <div className='sem-banner'>
        <h1>Kalender</h1>
        <h2>Für deine Organisation im aktuellen Semester</h2>
      </div>
      <button onClick={() => setModalOpen(true)}>Füge einen Termin hinzu</button>
      <div style={{ position: 'relative', zIndex: 0 }}>
        <FullCalendar
          locale="de"
          ref={calendarRef}
          events={events}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
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

        <AddEventModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onEventAdded={event => onEventAdded(event)}
          selectedDate={selectedDate}
        />
      </div>
    </section>
  );
};

export default Kalender;
