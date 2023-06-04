import mongoose from "mongoose";

const Sem6Schema = new mongoose.Schema({
    module: {
    type: String,
    required: true,
  },
  belegt: {
    type: Boolean,
    default: false,
  },
  bestanden: {
    type: Boolean,
    default: false,
  },
  userOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});

export const Sem6Model = mongoose.model('Sem6', Sem6Schema);