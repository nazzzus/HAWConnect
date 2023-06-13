import mongoose, { mongo } from "mongoose";

const ExamSchema = new mongoose.Schema({
    modul: { type: String, required: true },
    prof: { type: String, required: true },
    raum: { type: String, required: true },
    datum: { type: Date, required: true },
    art: { type: String, required: true },
    typ: { type: String, required: true },
    markedBy: { type: [String], default: [] }, // Standardwert für das Array
  });
  

export const ExamModel = mongoose.model('exams', ExamSchema);