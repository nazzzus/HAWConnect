import mongoose from "mongoose";

const Sem2Schema = new mongoose.Schema({
  modulName: { type: String, required: true },
  modulBestanden: { type: Boolean, default: false },
  pvlErhalten: { type: Boolean, default: false },
  belegt: { type: Boolean, default: false },
  note: { type: Number, min: 0, max: 15, default: null },
  userOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});

export const Sem2Model = mongoose.model('Sem2', Sem2Schema);