import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { userRouter } from './routes/users.js';
import { mealsRouter } from './routes/meals.js';
import { newsRouter } from './routes/news.js';
import { booksRouter } from './routes/books.js';
import { quotesRouter } from './routes/quotes.js';
import { examsRouter } from './routes/exams.js';
import { profilRouter } from './routes/profil.js';
import { tasksRouter } from './routes/tasks.js';
import { schedulesRouter } from './routes/schedules.js';
import bodyParser from 'body-parser';
import { eventsRouter } from './routes/event.js';
import { notisRouter } from './routes/notis.js';
import { profilbildRouter } from './routes/profilbild.js';
import { icsRouter } from './routes/ics.js';
/* import { semRouter } from './routes/semester.js'; */
import { sem1Router } from './routes/sem1.js';
import { sem2Router } from './routes/sem2.js';
import { sem3Router } from './routes/sem3.js';
import { sem4Router } from './routes/sem4.js';
import { sem5Router } from './routes/sem5.js';
import { sem6Router } from './routes/sem6.js';

const app = express()

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/auth", userRouter);
app.use('/sem1', sem1Router);
app.use('/sem2', sem2Router);
app.use('/sem3', sem3Router);
app.use('/sem4', sem4Router);
app.use('/sem5', sem5Router);
app.use('/sem6', sem6Router);
app.use("/meals", mealsRouter);
app.use("/news", newsRouter);
app.use('/book', booksRouter);
app.use('/quotes', quotesRouter);
app.use('/exam', examsRouter);
app.use('/profil', profilRouter);
app.use('/tasks', tasksRouter);
app.use('/splan', schedulesRouter);
app.use('/events', eventsRouter);
app.use('/notis', notisRouter);
app.use('/pfp', profilbildRouter)
app.use('/ics', icsRouter);
/* app.use('/sem', semRouter) */

mongoose.connect(
    "mongodb+srv://nazzzus:Genshin2023@hawcon.bncl3gu.mongodb.net/hawcon?retryWrites=true&w=majority"
    ),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

app.listen(3001, ()=> console.log("Server started!"));