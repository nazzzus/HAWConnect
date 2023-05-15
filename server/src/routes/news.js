
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


export {router as newsRouter};