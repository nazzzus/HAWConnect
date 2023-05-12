import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from "../models/Users.js";

const router = express.Router();




router.post("/register", async(req, res) => {
    const { username, email, password } = req.body;
    const user = await UserModel.findOne({username: username});
    const mail = await UserModel.findOne({email: email});
    

    if(user) {
        return res.status(400).json({   message: "User already exists!" });
    }

    if(mail){
        return res.status(400).json({   message: "Email already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({     username, email, password: hashedPassword,   });
    await newUser.save();

    res.json({  message: "User registered successfully!"    });
});





router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({username: username});

    if(!user) {
        return res.status(400).json({   message: "User doesn't exist!"  });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({   message: "Username or password is incorrect!"   });
    }

    const token = jwt.sign({    id: user._id    }, "secret"    );
    res.json({token, userID: user._id});
});


export {router as userRouter};