import express from 'express';
import mongoose from 'mongoose';
import { ExamModel } from '../models/Exam.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await ExamModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.post('/add', async (req, res) => {
  const exam = new ExamModel(req.body);
  try {
    const response = await exam.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.put('/mark/:id', async (req, res) => {
  const { id } = req.params;
  const { userId, mark } = req.body;

  try {
    const exam = await ExamModel.findById(id);

    if (!exam) {
      return res.status(404).json({ message: 'Prüfung nicht gefunden' });
    }

    if (mark) {
      // Markierung hinzufügen
      exam.markedBy.push(userId);
    } else {
      // Markierung aufheben
      exam.markedBy = exam.markedBy.filter((markedUserId) => markedUserId !== userId);
    }

    await exam.save();

    res.json({ message: 'Markierung aktualisiert' });
  } catch (err) {
    res.status(500).json({ message: 'Interner Serverfehler' });
  }
});

export { router as examsRouter };
