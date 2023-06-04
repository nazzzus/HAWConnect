import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  vorname: { type: String, required: true },
  nachname: { type: String, required: true },
  geschlecht: { type: String, required: false },
  studiengang: { type: String, required: false },
  geburtstag: { type: Date, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  erstelltAm: { type: Date, required: true, default: Date.now },
  profilbild: { type: String },
  savedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  savedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tasks' }],
  savedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Events' }],
  savedIcs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ics' }],
  role: { type: String, required: false, default: 'student' },
  semester: { type: Number, required: false, default: 0 },
  savedSem1: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sem1' }],
  savedSem2: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sem2' }],
  savedSem3: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sem3' }],
  savedSem4: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sem4' }],
  savedSem5: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sem5' }],
  savedSem6: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sem6' }],
});

export const UserModel = mongoose.model("users", UserSchema);
