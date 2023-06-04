import mongoose from "mongoose";

const Sem2Schema = new mongoose.Schema({
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

export const Sem2Model = mongoose.model('Sem2', Sem2Schema);