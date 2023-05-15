import mongoose from "mongoose";

const MealsSchema = new mongoose.Schema({
    menu: {
        type: String,
        required: true,
    },
    wochentag: {
        type: String, 
        required: true, 
        },
    datum: {
        type: Date,
        required: true,
    },
    name: {
        type: String, 
        required: true, 
        },
    ingredients: {
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
    },
})

export const MealsModel = mongoose.model("meals", MealsSchema);