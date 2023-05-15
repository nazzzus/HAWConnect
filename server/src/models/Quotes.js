import mongoose from "mongoose";

const QuotesSchema = new mongoose.Schema({
    text: {type: String, required: true},
    from: {type: String, required: true},
})

export const QuotesModel = mongoose.model('quotes', QuotesSchema);