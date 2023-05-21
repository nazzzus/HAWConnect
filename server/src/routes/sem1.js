import express from 'express';
import mongoose from 'mongoose';
import { Sem1Model } from '../models/Sem1';
import { UserModel } from '../models/Users';
import { verifyToken } from './users';

const router = express.Router();

router.get('/user/:userId', verifyToken, async(req, res) => {
    try {
        const sem1s = await Sem1Model.find({    userOwner: req.params.userId    });
        res.status(200).json({sem1s});
    } catch (err) {
        res.status(500).json(err);
    }
})


router.post('/add')