import express from 'express';
import mongoose from 'mongoose';
import { ExamModel } from '../models/Exam.js';

const router = express.Router();

router.get('/', async(req, res) => {
    try{
        const response = await ExamModel.find({});
        res.json(response);
    }catch(err){
        res.json(err);
    }
})

router.post('/add', async(req, res) => {
    const exam = new ExamModel(req.body);
    try {
        const response = await exam.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
})

export {router as examsRouter};