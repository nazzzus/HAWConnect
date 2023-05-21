import mongoose from "mongoose";

const Sem1Schema = new mongoose.Schema({
    modulname: {type: String, required: true},
    note: {type: Number, required: true, default: 0},
    belegt: {type: Boolean, required: true, default: false},
    bestanden: {type: Boolean, required: true, default: false},
});

export const Sem1Model = mongoose.model('sem1', Sem1Schema);