import { verifyToken } from "./users.js";
import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from "../models/Users.js";
import moment from "moment";
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });


//wird benutzt für geburtstagsglückwunsch
router.get('/birthday/:userId', async (req, res) => {
    try {
      const userId = req.params.userId; // Annahme: Der aktuelle eingeloggte Benutzer ist im Token gespeichert und kann über req.user.id abgerufen werden
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const currentDate = moment().format("MM-DD");
      const userBirthday = moment(user.geburtstag).format("MM-DD");
  
      if (currentDate === userBirthday) {
        return res.json({ message: `Happy birthday, ${user.username}!` });
      } else {
        return res.json({ message: `Today is not ${user.username}'s birthday.` });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // wird benutzt für Profil
  router.get('/user/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Finde den Benutzer mit der angegebenen userId
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