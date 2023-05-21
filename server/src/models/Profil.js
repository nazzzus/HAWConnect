import mongoose from "mongoose";

const ProfilSchema = new mongoose.Schema({
    semester: {type: Number, required: false},
    profilbild: {type: Buffer, required: false},
    belegteModule: {type: Number, required: true, default: 0},
    bestandeneModule: {type: Number, required: true, default: 0},
})

export const ProfilModel = mongoose.model('profil', ProfilSchema);