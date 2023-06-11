import express from "express";
import mongoose from "mongoose";
import { BookModel } from "../models/Books.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from './users.js';
import jwt from 'jsonwebtoken';


const router = express.Router();

router.get('/user/:userId', verifyToken, async (req, res) => {
  try {
    const books = await BookModel.find({ userOwner: req.params.userId });
    res.status(200).json({ books });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/add', verifyToken, async (req, res) => {
  const { buchtitel, buchautor, ausleihdatum, rueckgabedatum, status, userOwner } = req.body;

  try {
    const book = await BookModel.create({
      _id: new mongoose.Types.ObjectId(),
      buchtitel,
      buchautor,
      ausleihdatum,
      rueckgabedatum,
      status,
      userOwner,
    });

    res.status(201).json({
      createdBook: {
        buchtitel: book.buchtitel,
        buchautor: book.buchautor,
        ausleihdatum: book.ausleihdatum,
        rueckgabedatum: book.rueckgabedatum,
        status: book.status,
        _id: book._id,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:bookId', verifyToken, async (req, res) => {
  const { bookId } = req.params;

  try {
    const book = await BookModel.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Buch nicht gefunden' });
    }

    await BookModel.findByIdAndRemove(bookId);
    res.status(200).json({ message: 'Buch erfolgreich gelöscht' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:bookId', async (req, res) => {
  const { bookId } = req.params;
  const updatedBook = req.body;

  try {
    const book = await BookModel.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Buch nicht gefunden' });
    }

    await BookModel.findByIdAndUpdate(bookId, updatedBook);
    res.status(200).json({ message: 'Buch erfolgreich aktualisiert' });
  } catch (err) {
    res.status(500).json(err);
  }
});

export { router as booksRouter };