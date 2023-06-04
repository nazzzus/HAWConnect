import mongoose from "mongoose";

const Sem1Schema = new mongoose.Schema({
    module: {
        type: String,
        default: function () {
          return [
            'Grundlagen der Mathematik',
            'Grundlagen der Wirtschaftsinformatik', 
            'Programmiermethodik I',
            'Programmiertechnik',
            'Betriebswirtschaftslehre I']; // Hier werden die Standardwerte definiert
        },
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

export const Sem1Model = mongoose.model('Sem1', Sem1Schema);
