import mongoose from "mongoose";

const ProfilbildSchema = new mongoose.Schema({
    imageName: { type: String, required: true },
    imagePath: { type: String, required: true },
});



export const ProfilbildModel = mongoose.model('ProfileImages', ProfilbildSchema);