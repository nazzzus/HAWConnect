import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from "../models/Users.js";
import moment from "moment";
import { Sem1Model } from "../models/Sem2.js";
import { Sem2Model } from "../models/Sem2.js";
import { Sem3Model } from "../models/Sem2.js";
import { Sem4Model } from "../models/Sem2.js";
import { Sem5Model } from "../models/Sem2.js";
import { Sem6Model } from "../models/Sem2.js";


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


const initialModules1 = [
  { name: 'Grundlagen der Mathematik' },
  { name: 'Grundlagen der Wirtschaftsinformatik' },
  { name: 'Programmiermethodik I' },
  { name: 'Programmiertechnik' },
  { name: 'Betriebswirtschaftslehre I' },
];

const initialModules2 = [
  { name: 'Informationssysteme I' },
  { name: 'Theoretische Informatik' },
  { name: 'Programmiermethodik II' },
  { name: 'Quantitative Methoden' },
  { name: 'Betriebswirtschaftslehre II' },
];

const initialModules3 = [
  { name: 'Wahrscheinlichkeitsrechnung und Statistik' },
  { name: 'Algorithmen und Datenstrukturen' },
  { name: 'Software Engineerinig und Architektur I' },
  { name: 'Wirtschaftsinformatik I' },
  { name: 'Betriebswirtschaftslehre III' },
];

const initialModules4 = [
  { name: 'Informationssysteme II' },
  { name: 'Software Engineering und Architektur II' },
  { name: 'Rechnernetze und Betriebssysteme' },
  { name: 'Wirtschaftsinformatik II' },
  { name: 'Betriebswirtschaftslehre IV' },
];

const initialModules5 = [
  { name: 'Projekt' },
  { name: 'Seminar Wirtschaftsinformatik' },
  { name: 'Wirtschaftsinformatik III' },
  { name: 'Recht' },
  { name: 'Wahlpflichtfach I' },
];

const initialModules6 = [
  { name: 'Bachelorarbeit' },
  { name: 'Wahlpflichtfach II' },
  { name: 'Wahlpflichtfach III' },
  { name: 'Gesellschaftswissenschaft I' },
  { name: 'Gesellschaftswissenschaft II' },
];



const initializeUserModules = async (userId) => {
  const sem1 = new Sem1Model({ modul: initialModules1, userOwner: userId });
  await sem1.save();
  const sem2 = new Sem2Model({ modul: initialModules2, userOwner: userId });
  await sem2.save();
  const sem3 = new Sem3Model({ modul: initialModules3, userOwner: userId });
  await sem3.save();
  const sem4 = new Sem4Model({ modul: initialModules4, userOwner: userId });
  await sem4.save();
  const sem5 = new Sem5Model({ modul: initialModules5, userOwner: userId });
  await sem5.save();
  const sem6 = new Sem6Model({ modul: initialModules6, userOwner: userId });
  await sem6.save();

};





router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  
  const user = await UserModel.findOne({username: username});

  if(!user) {
    return res.status(400).json({message: "User doesn't exist!"});
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(!isPasswordValid){
    return res.status(400).json({message: "Password is incorrect!"});
  }

  const token = jwt.sign({id: user._id}, "secret");

  const sem1Doc = await Sem1Model.findOne({userOwner: user._id});
  const sem2Doc = await Sem2Model.findOne({userOwner: user._id});
  const sem3Doc = await Sem3Model.findOne({userOwner: user._id});
  const sem4Doc = await Sem4Model.findOne({userOwner: user._id});
  const sem5Doc = await Sem5Model.findOne({userOwner: user._id});
  const sem6Doc = await Sem6Model.findOne({userOwner: user._id});


  if (!sem1Doc || !sem2Doc || !sem3Doc || !sem4Doc || !sem5Doc || !sem6Doc ) {
    await initializeUserModules(user._id);
  }

  res.json({token, userID: user._id});
});


// Handler für das Bearbeiten eines Datenobjekts
router.put("/edit/:id", (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  DataModel.findByIdAndUpdate(id, updatedData)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.error("Fehler beim Bearbeiten der Daten:", error);
      res.sendStatus(500);
    });
});

// Handler für das Löschen eines Datenobjekts
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  DataModel.findByIdAndDelete(id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.error("Fehler beim Löschen der Daten:", error);
      res.sendStatus(500);
    });
});

router.post('/reset-password', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Überprüfen, ob der Benutzer existiert
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }

    // Das Passwort des Benutzers zurücksetzen
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Passwort erfolgreich zurückgesetzt' });
  } catch (error) {
    console.error('Fehler beim Zurücksetzen des Passworts:', error);
    res.status(500).json({ message: 'Interner Serverfehler' });
  }
});

router.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { semester } = req.body;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { semester },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Benutzer nicht gefunden" });
    }

    res.json({ user: updatedUser });
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Semesters:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
});

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

