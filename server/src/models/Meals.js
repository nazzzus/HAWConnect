import mongoose from "mongoose";

const MealSchema = new mongoose.Schema({
    menu: {
        type: String,
        required: true,
    },
    name: {
        type: String, 
        required: true, 
        },
    ingredients: [{
        type: String,
        required: true,
    }],
    price:{
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
})

export const MealModel = mongoose.model("meals", MealSchema);