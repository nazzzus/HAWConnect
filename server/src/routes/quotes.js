import express, { response } from 'express';
import mongoose from 'mongoose';
import { QuotesModel } from '../models/Quotes.js';

const router = express.Router();

router.get('/show', async (req, res) => {
    try{
        const response = await QuotesModel.find({});
        res.json(response);
    }catch(err){
        res.json(err);
    }
})

router.get('/random', async (req, res) => {
    try {
        const count = await QuotesModel.countDocuments();
        const randomIndex = Math.floor(Math.random() * count);
        const randomQuote = await QuotesModel.findOne().skip(randomIndex);
        res.json({ quote: randomQuote.text, author: randomQuote.from });
    } catch (err) {
        res.json(err);
    }
});
  

router.post('/add', async(req, res) => {
    const quotes = new QuotesModel(req.body);
    try {
        const response = await quotes.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
})



export {router as quotesRouter};