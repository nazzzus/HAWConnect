import multer from 'multer';
import express from 'express';
import ical from 'ical';
import fs from 'fs';
import { extractEventsFromICS } from './icsUtils.js'
import { IcsModel } from '../models/Ics.js';

const router = express.Router();

// Multer-Konfiguration für den Datei-Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/ics'); // Passe den Speicherort für die ICS-Dateien an
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.get('/ics-events/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;  
        const icsEvents = await IcsModel.find({ userOwner: userId});
        res.json(icsEvents);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving ICS events' });
    }
  });

  router.post('/upload-ics', upload.single('icsFile'), async (req, res) => {
    const userId = req.body.userOwner; // Extrahiere userId aus req.body
    const icsFilePath = req.file.path;
  
    // Lese die ICS-Datei
    const icsData = fs.readFileSync(icsFilePath, 'utf-8');
  
    // Verarbeite die ICS-Daten und extrahiere die Event-Daten
    const events = ical.parseICS(icsData);
    const extractedEvents = [];
  
    for (let key in events) {
      if (events.hasOwnProperty(key)) {
        const event = events[key];
  
        if (event.type === 'VEVENT') {
          extractedEvents.push({
            title: event.summary,
            start: event.start,
            end: event.end,
            userOwner: userId, // Füge das userOwner-Feld hinzu
          });
        }
      }
    }
  
    try {
      // Überprüfe, ob bereits eine ICS-Datei mit demselben Dateinamen existiert
      const existingFile = await IcsModel.findOne({ filename: req.file.originalname });
      if (existingFile) {
        return res.status(400).json({ message: 'Duplicate file. File with the same name already exists.' });
      }
  
      // Speichere die extrahierten Event-Daten in der Datenbank
      const savedEvents = await IcsModel.insertMany(extractedEvents);
  
      res.status(200).json({ message: 'ICS file uploaded and events saved', events: savedEvents });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving ICS events' });
    }
  });
  
  

export { router as icsRouter };
