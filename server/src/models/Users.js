import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:   {type: String, required: true, unique:true},
    password:   {type: String, required: true},
    email:      {type: String, required: true, unique:true},
    savedBooks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
})


export const UserModel = mongoose.model("users", UserSchema);