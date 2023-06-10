
import express from 'express';
import mongoose from 'mongoose';
import { NewsModel } from '../models/News.js';

const router = express.Router();

router.get('/show', async (req, res) => {
    try{    
        const response = await NewsModel.find({});
        res.json(response);
    }catch(err){
        res.json(err);
    }
})

router.post('/add', async (req, res) => {
    const news = new NewsModel(req.body);
    try{    
        const response = await news.save();
        res.json(response);
    }catch(err){
        res.json(err);
    }
})

router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Überprüfe, ob der News-Eintrag existiert
      const news = await NewsModel.findById(id);
      if (!news) {
        return res.status(404).json({ message: 'News-Eintrag nicht gefunden' });
      }
  
      // Führe die Löschoperation durch
      await NewsModel.findByIdAndDelete(id);
  
      return res.status(200).json({ message: 'News-Eintrag erfolgreich gelöscht' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Serverfehler beim Löschen des News-Eintrags' });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { titel, autor } = req.body;
  
      // Überprüfe, ob der News-Eintrag existiert
      const news = await NewsModel.findById(id);
      if (!news) {
        return res.status(404).json({ message: 'News-Eintrag nicht gefunden' });
      }
  
      // Aktualisiere die Felder des News-Eintrags
      news.titel = titel;
      news.autor = autor;
      const updatedNews = await news.save();
  
      return res.status(200).json(updatedNews);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Serverfehler beim Aktualisieren des News-Eintrags' });
    }
  });

export {router as newsRouter};