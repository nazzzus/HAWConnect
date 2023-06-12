import React, { useState } from "react";
import Modal from 'react-modal'
import 'react-datetime/css/react-datetime.css';
import { useGetUserId } from "../hooks/useGetUserId";
import Datetime from 'react-datetime';
import axios from "axios";
import { useCookies } from "react-cookie";
import '../styles/AddEvent.css';
import Swal from 'sweetalert2';
import moment from 'moment';
import 'moment/locale/de';
import { useNavigate } from "react-router-dom";

moment.locale('de');

export default function EventModal({ isOpen, onClose, onEventAdded, eventToEdit, onDelete, selectedDate }) {
  const userId = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const [events, setEvents] = useState({
    title: eventToEdit?.title || '',
    start: moment(eventToEdit?.start.toDate()), // Umwandlung in Moment-Objekt entfernen
    end: moment(eventToEdit?.end || selectedDate).toDate(), // Umwandlung in Moment-Objekt entfernen
    userOwner: userId,
  });

  const handleChange = (name, value) => {
    setEvents(prevEvents => ({
      ...prevEvents,
      [name]: value
    }));
  };

  const handleEdit = async () => {
    try {
      await axios.put(`http://localhost:3001/events/update-event/${eventToEdit.id}`, {
        title: events.title,
        start: moment(events.start).toISOString(),
        end: moment(events.end).toISOString(),
      }, {
        headers: { authorization: cookies.access_token },
      });
      alert('Termin aktualisiert!');
      if (onEventAdded) {
        onEventAdded();
      }
      onClose(); // Schließe das Modal nach dem Aktualisieren des Termins
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/events/delete-event/${eventToEdit.id}`, {
        headers: { authorization: cookies.access_token },
      });

      alert('Termin gelöscht!');
      if (onDelete) {
        onDelete();
      }
      onClose(); // Schließe das Modal nach dem Löschen des Termins
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (eventToEdit) {
      handleEdit();
    } else {
      try {
        await axios.post('http://localhost:3001/events/create-event', {
          ...events,
          start: moment(events.start).toISOString(),
          end: moment(events.end).toISOString(),
        }, {
          headers: {
            authorization: cookies.access_token
          },
        });
         {
          navigate('/Kalender');
          window.location.reload();
          if (onEventAdded) {
            onEventAdded();
          }
        };
        
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="modal-overlay"
      className="modal-main"
    >
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titel</label>
        </div>
        <input placeholder='Titel' value={events.title} onChange={(event) => handleChange('title', event.target.value)} />

        <div>
          <label>Startdatum</label>
          <Datetime
            value={events.start} // Verwenden Sie das Moment-Objekt direkt
            onChange={(value) => handleChange('start', moment(value).toDate())} // Wandeln Sie in JavaScript Date-Objekt um
            locale="de"
            dateFormat="DD.MM.YYYY"
            timeFormat="HH:mm"
          />
        </div>

        <div>
          <label>Enddatum</label>
          <Datetime
            value={events.end} // Verwenden Sie das Moment-Objekt direkt
            onChange={(value) => handleChange('end', moment(value).toDate())} // Wandeln Sie in JavaScript Date-Objekt um
            locale="de"
            dateFormat="DD.MM.YYYY"
            timeFormat="HH:mm"
          />
        </div>

        <button>{eventToEdit ? 'Bearbeiten' : 'Termin hinzufügen'}</button>
        {eventToEdit && <button type="button" onClick={handleDelete}>Löschen</button>}
      </form>
    </Modal>
  );
}
