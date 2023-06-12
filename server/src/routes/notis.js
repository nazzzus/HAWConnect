import { verifyToken } from "./users.js";
import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from "../models/Users.js";
import moment from "moment";
import multer from 'multer';
import { ExamModel } from "../models/Exam.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });


//wird benutzt für geburtstagsglückwunsch
router.get('/birthday/:userId', async (req, res) => {
    try {
      const userId = req.params.userId; 
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const currentDate = moment().format("MM-DD");
      const userBirthday = moment(user.geburtstag).format("MM-DD");
  
      if (currentDate === userBirthday) {
        return res.json({ message: `Alles gute zu deinem Geburtstag, ${user.vorname}!` });
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  router.get('/exams', async(req, res) => {
    try {
      const userId = req.params.userId;
      const exam = await ExamModel.findById(userId);

      if(!exam){
        return res.status(404).json({message:"Exam not found!"});
      }

      const currentDate = moment().format("MM-DD");
      const examEvent = moment(exam.event).format("MM-DD");

      if (currentDate === examEvent){
        return res.json({message: `Heute findet ${exam.event} statt!` });
      }else if( currentDate + 1 === examEvent){
        return res.json({message: `Morgen findet ${exam.event} statt!` });
      }else{
        return null;
      }
    } catch (err) {
      
    }
  })

  // wird benutzt für Profil
  router.get('/user/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'Benutzer nicht gefunden' });
      }
  
      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Serverfehler' });
    }
  });

  
  
  export {router as notisRouter };