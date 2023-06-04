import mongoose from "mongoose";

const Sem3Schema = new mongoose.Schema({
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

export const Sem3Model = mongoose.model('Sem3', Sem3Schema);