import { verifyToken } from "./users.js";
import { ProfilbildModel } from "../models/Profilbild.js";
import express from 'express';
import { UserModel } from "../models/Users.js";

const router = express.Router();


const createProfileImages = async () => {
    try {
      const profileImage1 = new ProfilbildModel({
        imageName: 'Profilbild 1',
        imagePath: '/pics/hawaii.png', // Passe den Pfad entsprechend an
      });
      await profileImage1.save();
  
      const profileImage2 = new ProfilbildModel({
        imageName: 'Profilbild 2',
        imagePath: '/pics/pirat.png', // Passe den Pfad entsprechend an
      });
      await profileImage2.save();
  
      const profileImage3 = new ProfilbildModel({
        imageName: 'Profilbild 1',
        imagePath: '/pics/rainbow.png', // Passe den Pfad entsprechend an
      });
      await profileImage3.save();
  
      const profileImage4 = new ProfilbildModel({
        imageName: 'Profilbild 2',
        imagePath: '/pics/steinzeit.png', // Passe den Pfad entsprechend an
      });
      await profileImage4.save();
  
      console.log('Profilbilder wurden erfolgreich erstellt und gespeichert');
    } catch (error) {
      console.error('Fehler beim Erstellen und Speichern der Profilbilder:', error);
    }
  };

createProfileImages();

router.get('/profile-images', async (req, res) => {
    try {
      const profileImages = await ProfilbildModel.find();
      res.json(profileImages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.post('/users/:userId/select-profile-image/:imageId', async (req, res) => {
    const { userId, imageId } = req.params;
  
    try {
      const user = await UserModel.findById(userId);
      user.savedProfileImage = imageId;
      await user.save();
  
      res.json({ message: 'Selected profile image updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating selected profile image' });
    }
  });

  export { router as profilbildRouter };