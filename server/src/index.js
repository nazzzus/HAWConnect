import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { userRouter } from './routes/users.js';
import { recipeRouter } from './routes/recipes.js';
import { newsRouter } from './routes/news.js';


const app = express()

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipeRouter);
app.use("/news", newsRouter);

mongoose.connect(
    "mongodb+srv://nazzzus:Genshin2023@hawcon.bncl3gu.mongodb.net/hawcon?retryWrites=true&w=majority"
    );

app.listen(3001, ()=> console.log("Server started!"));