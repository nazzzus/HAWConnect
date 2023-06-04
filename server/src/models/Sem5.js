import mongoose from "mongoose";

const Sem5Schema = new mongoose.Schema({
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

export const Sem5Model = mongoose.model('Sem5', Sem5Schema);