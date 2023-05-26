import { UserModel } from "../models/Users.js";
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';


const router = express.Router();

// Multer-Konfiguration für den Datei-Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), 'uploads');
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage });

router.post('/add/:userId', upload.single('profileImage'), async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const imagePath = req.file.path;

    // Speichern des Bildpfads in der Datenbank
    user.profilbild = imagePath;
    await user.save();

    res.status(201).json({
      createdPfp: {
        profilbild: user.profilbild,
      },
      message: 'Selected profile image updated successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating selected profile image' });
  }
});

router.get('/image/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId);

    if (!user || !user.profilbild) {
      return res.status(404).json({ message: 'Profile image not found' });
    }

    res.sendFile(user.profilbild);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving profile image' });
  }
});

export { router as profilbildRouter };
