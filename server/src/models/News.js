import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
    titel: {type: String, required: true},
    autor: {type: String, required: true},
    datum: {type: Date, required: true},
    erstelltAm: {type: Date, required: true, default: Date.now},
})

export const NewsModel = mongoose.model('news', NewsSchema);

