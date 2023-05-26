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
});

export const UserModel = mongoose.model("users", UserSchema);
