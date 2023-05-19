import express from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/Users.js";
import { ScheduleModel } from "../models/Schedule.js";
import {verifyToken} from './users.js';


const router = express.Router();

router.post('/schedule', async (req, res) => {
    try {
      const { userId, subjects } = req.body;
  
      const schedule = new ScheduleModel({
        user: userId,
        subjects: subjects,
      });
  
      const savedSchedule = await schedule.save();
      res.status(200).json(savedSchedule);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // Route zum Abrufen des Stundenplans eines Benutzers
  router.get('/schedule/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const schedule = await ScheduleModel.findOne({ user: userId });
      res.status(200).json(schedule);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // Route zum Aktualisieren des Stundenplans eines Benutzers
  router.put('/schedule/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const { subjects } = req.body;
  
      const updatedSchedule = await ScheduleModel.findOneAndUpdate(
        { user: userId },
        { subjects: subjects },
        { new: true }
      );
  
      res.status(200).json(updatedSchedule);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  export { router as schedulesRouter };