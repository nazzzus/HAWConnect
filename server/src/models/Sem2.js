import mongoose from "mongoose";

const ModuleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  modulBestanden: { type: Boolean, default: false },
  pvlErhalten: { type: Boolean, default: false },
  belegt: { type: Boolean, default: false },
  note: { type: Number, min: 0, max: 15, default: 0 },
});

const Sem2Schema = new mongoose.Schema({
  modul: [ModuleSchema],
  userOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});

export const Sem2Model = mongoose.model('Sem2', Sem2Schema);

const Sem1Schema = new mongoose.Schema({
  modul: [ModuleSchema],
  userOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});

export const Sem1Model = mongoose.model('Sem1', Sem1Schema);

const Sem3Schema = new mongoose.Schema({
  modul: [ModuleSchema],
  userOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});

export const Sem3Model = mongoose.model('Sem3', Sem3Schema);

const Sem4Schema = new mongoose.Schema({
  modul: [ModuleSchema],
  userOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});

export const Sem4Model = mongoose.model('Sem4', Sem4Schema);

const Sem5Schema = new mongoose.Schema({
  modul: [ModuleSchema],
  userOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});

export const Sem5Model = mongoose.model('Sem5', Sem5Schema);

const Sem6Schema = new mongoose.Schema({
  modul: [ModuleSchema],
  userOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});

export const Sem6Model = mongoose.model('Sem6', Sem6Schema);


