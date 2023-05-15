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

export {router as mealsRouter};

