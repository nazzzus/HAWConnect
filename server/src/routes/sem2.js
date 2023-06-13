import express from 'express';
import { Sem2Model } from '../models/Sem2.js';
import { verifyToken } from './users.js';

const router = express.Router();

// GET Route für alle Module im zweiten Semester eines Benutzers
router.get('/', verifyToken, async (req, res) => {
  try {
    const sem2Modules = await Sem2Model.find({ userOwner: req.user._id });
    res.status(200).json(sem2Modules);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST Route zum Hinzufügen eines Moduls im zweiten Semester
router.post('/', verifyToken, async (req, res) => {
  const { modulName } = req.body;
  try {
    const sem2Module = new Sem2Model({
      modulName,
      userOwner: req.user._id,
    });
    await sem2Module.save();
    res.status(201).json(sem2Module);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT Route zum Aktualisieren eines Moduls im zweiten Semester
router.put('/:id', verifyToken, async (req, res) => {
  const { modulName, modulBestanden, pvlErhalten, belegt, note } = req.body;
  try {
    const updatedSem2Module = await Sem2Model.findByIdAndUpdate(
      req.params.id,
      {
        modulName,
        modulBestanden,
        pvlErhalten,
        belegt,
        note,
      },
      { new: true }
    );
    res.status(200).json(updatedSem2Module);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE Route zum Löschen eines Moduls im zweiten Semester
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Sem2Model.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Modul erfolgreich gelöscht' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

export {router as sem2Router} ;
