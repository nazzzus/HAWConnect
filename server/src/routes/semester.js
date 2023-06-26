/* import express from 'express'
import mongoose from 'mongoose'
import { Sem1Model } from '../models/Sem1.js'
import { Sem2Model } from '../models/Sem2.js'
import { Sem3Model } from '../models/Sem3.js'
import { Sem4Model } from '../models/Sem4.js'
import { Sem5Model } from '../models/Sem5.js'
import { Sem6Model } from '../models/Sem6.js'
import { verifyToken } from './users.js'

const router = express.Router()

router.get('/user/:userId', verifyToken, async(req, res) => {
    try {
        const sem1 = await Sem1Model.find({userOwner: req.params.userId})
        res.status(200).json({sem1})
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/add-sem1', verifyToken, async(req, res) => {
    const { module, belegt, bestanden, userOwner } = req.body

    try {
        const sem = await Sem1Model.create({
            _id: new mongoose.Types.ObjectId(),
            module,
            belegt,
            bestanden,
            userOwner,
        })
        res.status(201).json({
            createdSem1: {
                module: sem.module,
                belegt: sem.belegt,
                bestanden: sem.bestanden,
                _id: sem._id,
            }
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

export { router as semRouter } */