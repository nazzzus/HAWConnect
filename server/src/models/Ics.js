import mongoose from "mongoose";

const IcsEventSchema  = new mongoose.Schema({
    title: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    userOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});

export const IcsModel = mongoose.model("Ics", IcsEventSchema);