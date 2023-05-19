import React, { useState } from "react";
import Modal from 'react-modal'
import 'react-datetime/css/react-datetime.css';
import { useGetUserId } from "../hooks/useGetUserId";
import Datetime from 'react-datetime';
import axios from "axios";
import { useCookies } from "react-cookie";
import '../styles/AddEvent.css';

// Importiere moment und die deutsche Lokalisierung
import moment from 'moment';
import 'moment/locale/de';
import { useNavigate } from "react-router-dom";

// Konfiguriere moment auf Deutsch
moment.locale('de');

export default function EventModal({ isOpen, onClose, onEventAdded, eventToEdit, onDelete }) {
  const userId = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const [events, setEvents] = useState({
    title: eventToEdit?.title || '',
    start: eventToEdit?.start || '',
    end: eventToEdit?.end || '',
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
      await axios.put(`http://localhost:3001/events/update-event/${eventToEdit.id}`, events, {
        headers: {
          authorization: cookies.access_token
        },
      });
      alert('Termin aktualisiert!');
      if (onEventAdded) {
        onEventAdded();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/events/delete-event/${eventToEdit.id}`, {
        headers: {
          authorization: cookies.access_token
        },
      });
      alert('Termin gelöscht!');
      if (onDelete) {
        onDelete();
      }
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
        await axios.post('http://localhost:3001/events/create-event', events, {
          headers: {
            authorization: cookies.access_token
          },
        });
        alert('Termin hinzugefügt!');
        navigate('/Kalender'); 
        window.location.reload();
        if (onEventAdded) {
          onEventAdded();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div className="modal-main">
        <form onSubmit={handleSubmit}>
          <input placeholder='Titel' value={events.title} onChange={(event) => handleChange('title', event.target.value)} />

          <div>
            <label> Startdatum</label>
            <Datetime
              value={events.start}
              onChange={(value) => handleChange('start', value)}
              locale="de" // Setze die locale-Eigenschaft auf "de" für Deutsch
              dateFormat="DD.MM.YYYY" // Setze das Datumsformat auf Deutsch
              timeFormat="HH:mm" // Setze das Uhrzeitformat auf Deutsch
            />
          </div>

          <div>
            <label> Enddatum</label>
            <Datetime
              value={events.end}
              onChange={(value) => handleChange('end', value)}
              locale="de" // Setze die locale-Eigenschaft auf "de" für Deutsch
              dateFormat="DD.MM.YYYY" // Setze das Datumsformat auf Deutsch
              timeFormat="HH:mm" // Setze das Uhrzeitformat auf Deutsch
            />
          </div>

          <button>{eventToEdit ? 'Bearbeiten' : 'Termin hinzufügen'}</button>
          {eventToEdit && <button type="button" onClick={handleDelete}>Löschen</button>}
        </form>
      </div>
    </Modal>
  );
}