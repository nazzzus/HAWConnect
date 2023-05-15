import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { userRouter } from './routes/users.js';
import { mealsRouter } from './routes/meals.js';
import { newsRouter } from './routes/news.js';
import { booksRouter } from './routes/books.js';

const app = express()

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/meals", mealsRouter);
app.use("/news", newsRouter);
app.use('/book', booksRouter);

mongoose.connect(
    "mongodb+srv://nazzzus:Genshin2023@hawcon.bncl3gu.mongodb.net/hawcon?retryWrites=true&w=majority"
    ),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

app.listen(3001, ()=> console.log("Server started!"));