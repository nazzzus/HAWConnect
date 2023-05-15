import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    buchtitel: {type: String, required: true},
    buchautor: {type: String, required: true},
    ausleihdatum: {type: Date, required: true},
    rueckgabedatum: {type: Date, required: true},
    status:{type: String, required: true, default: "aktiv"},
    erstelltAm:{type: Date, required: true, default: Date.now},
    zurueckAm:{type: Date, required: false},
    userOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});

export const BookModel = mongoose.model('books', BookSchema);
