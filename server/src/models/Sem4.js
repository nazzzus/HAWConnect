import mongoose from "mongoose";

const Sem4Schema = new mongoose.Schema({
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

export const Sem4Model = mongoose.model('Sem4', Sem4Schema);