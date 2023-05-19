import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subjects: [{
      name: {
        type: String,
        required: true,
      },
      day: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
    }],
  });

export const ScheduleModel = mongoose.model('schedules', ScheduleSchema);