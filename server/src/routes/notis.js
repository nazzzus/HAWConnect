import { verifyToken } from "./users.js";
import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from "../models/Users.js";
import moment from "moment";
import multer from 'multer';
import { ExamModel } from "../models/Exam.js";
import { BookModel }  from '../models/Books.js'

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

  router.get('/exams/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const exams = await ExamModel.find({
        markedBy: userId
      });
  
      if (!exams || exams.length === 0) {
        return res.json({message: "Keine bevorstehenden Prüfungen"});
      }
  
      let examTitles = exams.map(exam => exam.modul);
  
      return res.json({message: `Folgende Prüfungen hast du markiert für das aktuelle Semester:${examTitles.join(', ')}`});


    } catch (err) {
      console.error(err);
      return res.status(500).json({message: "Serverfehler"});
    }
  });
  

  router.get('/books', async(req, res) => {
    try {
      const userId = req.params.userId;
      const book = await BookModel.findById(userId);

      if(!book){
        return res.status(404).json({message:"Book not found!"});
      }

      const currentDate = moment().format("MM-DD");
      const bookEvent = moment(book.event).format("MM-DD");

      if (currentDate === bookEvent){
        return res.json({message: `Heute findet ${book.event} statt!` });
      }else if( currentDate + 1 === bookEvent){
        return res.json({message: `Morgen findet ${book.event} statt!` });
      }else{
        return null;
      }
    } catch (err) {
      
    }
  })

  router.get('/books/comingdue/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const currentDate = moment();
      const dueDate = moment().add(7, 'days');
  
      const books = await BookModel.find({
        userOwner: userId,
        rueckgabedatum: {
          $gte: currentDate.toDate(),
          $lte: dueDate.toDate()
        }
      });
  
      if (!books || books.length === 0) {
        return res.json({message: null});
      }
  
      // Iterate through books and gather all the titles
      let bookTitles = books.map(book => book.buchtitel);
  
      return res.json({message: `Du musst ${books.length} Bücher in den nächsten 7 Tagen zurückgeben: ${bookTitles.join(', ')}`});
    } catch (err) {
      console.error(err);
      return res.status(500).json({message: "Server error"});
    }
  });

  router.get('/books/comingdueToday/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const startOfDay = moment().startOf('day');
      const endOfDay = moment().endOf('day');
  
      const books = await BookModel.find({
        userOwner: userId,
        rueckgabedatum: {
          $gte: startOfDay.toDate(),
          $lte: endOfDay.toDate()
        }
      });
  
      if (!books || books.length === 0) {
        return res.json({message: null});
      }
  
      // Iterate through books and gather all the titles
      let bookTitles = books.map(book => book.buchtitel);
  
      return res.json({message: `Heute abgeben musst du: ${bookTitles.join(', ')}`});
    } catch (err) {
      console.error(err);
      return res.status(500).json({message: "Server error"});
    }
  });
  
  

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