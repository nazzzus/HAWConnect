import express from 'express';
import { ProfilModel } from '../models/Profil.js';

const router = express.Router();

router.get('/show', async (req, res) => {
  try {
    const response = await ProfilModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.post('/add', async (req, res) => {
  const profil = new ProfilModel(req.body);
  try {
    const response = await profil.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.put('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await ProfilModel.findByIdAndUpdate(id, req.body, { new: true });
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await ProfilModel.findByIdAndDelete(id);
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

export { router as profilRouter };
