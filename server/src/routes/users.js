import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from "../models/Users.js";
import moment from "moment";
import { Sem2Model } from "../models/Sem2.js";


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



const initialModules2 = [
  { name: 'Informationssysteme I' },
  { name: 'Theoretische Informatik' },
  { name: 'Programmiermethodik II' },
  { name: 'Quantitative Methoden' },
  { name: 'Betriebswirtschaftslehre II' },
];

const initializeUserModules = async (userId) => {
  const sem2 = new Sem2Model({ modul: initialModules2, userOwner: userId });
  await sem2.save();
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

  const sem2Doc = await Sem2Model.findOne({userOwner: user._id});


  if (!sem2Doc) {
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

