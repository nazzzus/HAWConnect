import express, { response } from 'express';
import mongoose from 'mongoose';
import { MealsModel } from "../models/Meals.js";

const router = express.Router();

router.get('/show', async (req, res) => {
    try {
        const response = await MealsModel.find({});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

router.post('/add', async (req, res) => {
    const meals = new MealsModel( req.body  )
    try {
        const response = await meals.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

router.get('/menus/weekly', async (req, res) => {
    try {
      // Bestimme den aktuellen Wochentag und das aktuelle Datum
      const currentDate = new Date();
      const currentDay = currentDate.getDay(); // 0 (Sonntag) bis 6 (Samstag)
  
      // Berechne das Start- und Enddatum der aktuellen Woche
      const startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - currentDay); // Setze auf den Montag der aktuellen Woche
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6); // Setze auf den Sonntag der aktuellen Woche
  
      // Rufe die Menüs für die aktuelle Woche aus der Datenbank ab
      const menus = await MealsModel.find({
        datum: { $gte: startDate, $lte: endDate },
      });
  
      res.json(menus);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

  router.get('/get-meals', async(req, res) => {
    try{
        const response = await MealsModel.find({});
        res.json(response);
    }catch(err){
        res.json(err);
    }
})

router.get('/get-meals/:menuValue', async (req, res) => {
  try {
    const menuValue = req.params.menuValue;

    const meals = await MealsModel.find({ menu: menuValue });

    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export {router as mealsRouter};

