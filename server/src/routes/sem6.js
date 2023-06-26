import express from 'express';
import { Sem6Model } from '../models/Sem2.js';
import { verifyToken } from './users.js';

const router = express.Router();

router.get('/get/:userId', verifyToken, async (req, res) => {
  try {
    const sem6 = await Sem6Model.findOne({ userOwner: req.params.userId });
    res.status(200).json(sem6.modul);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/toggle-belegt/:moduleId', async (req, res) => {
  try {
    const sem6 = await Sem6Model.findOneAndUpdate(
      { 'modul._id': req.params.moduleId },
      { $set: { 'modul.$.belegt': req.body.belegt }},
      { new: true },
    );
    res.status(200).json(sem6.modul);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/toggle-pvl/:moduleId', async (req, res) => {
  try {
    const sem6 = await Sem6Model.findOneAndUpdate(
      { 'modul._id': req.params.moduleId },
      { $set: { 'modul.$.pvlErhalten': req.body.pvlErhalten }},
      { new: true },
    );
    res.status(200).json(sem6.modul);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/toggle-bestanden/:moduleId', async (req, res) => {
  try {
    const sem6 = await Sem6Model.findOneAndUpdate(
      { 'modul._id': req.params.moduleId },
      { $set: { 'modul.$.modulBestanden': req.body.modulBestanden }},
      { new: true },
    );
    res.status(200).json(sem6.modul);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/update-note/:moduleId', async (req, res) => {
  try {
    const sem6 = await Sem6Model.findOneAndUpdate(
      { 'modul._id': req.params.moduleId },
      { $set: { 'modul.$.note': req.body.note }},
      { new: true },
    );
    res.status(200).json(sem6.modul);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

export {router as sem6Router} ;