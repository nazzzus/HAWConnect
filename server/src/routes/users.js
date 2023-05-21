import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from "../models/Users.js";
import moment from "moment";


const router = express.Router();


router.post("/register", async(req, res) => {
    const { 
      username, 
      vorname, 
      nachname, 
      geschlecht, 
      studiengang, 
      geburtstag, 
      password, 
      email } = req.body;
    const user = await UserModel.findOne({username: username});
    const mail = await UserModel.findOne({email: email});
    

    if(user) {
        return res.status(400).json({   message: "User already exists!" });
    }

    if(mail){
        return res.status(400).json({   message: "Email already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({     
      username, 
      vorname, 
      nachname, 
      geschlecht, 
      studiengang,
      geburtstag,
      password: hashedPassword,
      email,    
      });
    await newUser.save();

    res.json({  message: "User registered successfully!"    });
});





router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  
  const user = await UserModel.findOne({username: username});

  if(!user) {
      return res.status(400).json({   message: "User doesn't exist!"  });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(!isPasswordValid){
      return res.status(400).json({   message: "Password is incorrect!"   });
  }


  const token = jwt.sign({    id: user._id    }, "secret"    );
  res.json({token, userID: user._id});
});





// Funktion zum Vergleichen des Geburtstags mit dem aktuellen Tag
export const sendBirthdayWishes = async () => {
  // Aktuelles Datum
  const currentDate = moment().format("MM-DD");

  // Benutzer mit Geburtstag am aktuellen Tag abrufen
  const users = await UserModel.find({ geburtstag: { $regex: currentDate } });

  // Glückwunschtext generieren
  const wishes = users.map((user) => `Herzlichen Glückwunsch, ${user.username}! Alles Gute zum Geburtstag!`);

  // Ausgabe der Glückwünsche
  console.log(wishes);
  // oder: return wishes; // Wenn Sie die Glückwünsche zurückgeben möchten
};


export {router as userRouter};

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
  jwt.verify(authHeader, "secret", { algorithms: ["HS256"] }, (err) => {
    if (err) {
      return res.sendStatus(403);
    }
    next();
  });
} else {
  return res.sendStatus(403);
}

};