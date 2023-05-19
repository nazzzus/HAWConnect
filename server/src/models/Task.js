import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    task:{
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        required: true,
        default: false
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true},
})

export const TaskModel = mongoose.model('tasks', TaskSchema);