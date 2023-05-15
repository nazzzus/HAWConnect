import mongoose from "mongoose";

const ProfilSchema = new mongoose.Schema({
    semester: {type: Number, required: false},
    profilbild: {type: Buffer, required: false},
    belegteModule: {type: Number, required: false},
    bestandeneModule: {type: Number, required: false},
})

export const ProfilModel = mongoose.model('profil', ProfilSchema);