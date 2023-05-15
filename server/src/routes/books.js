import express from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/Users.js";
import { BookModel } from "../models/Books.js";
import {verifyToken} from './users.js';

const router = express.Router();



router.get('/get', async (req, res) => {
    try{    
        const response = await BookModel.find({});
        res.status(200).json(response);
    }catch(err){
        res.status(500).json(err);
    }
})


//add new book
router.post('/add', verifyToken, async (req, res) => {
    const book = new BookModel({
        _id: new mongoose.Types.ObjectId(),
        buchtitel: req.body.buchtitel,
        buchautor: req.body.buchautor,
        ausleihdatum: req.body.ausleihdatum,
        rueckgabedatum: req.body.rueckgabedatum,
        status: req.body.status,
        userOwner: req.body.userOwner,
    });
    console.log(book);

    try{    
        const result = await book.save();
        res.status(201).json({
            createdBook:{
            buchtitel: result.buchtitel,
            buchautor: result.buchautor,
            ausleihdatum: result.ausleihdatum,
            rueckgabedatum: result.rueckgabedatum,
            status: result.status,
            _id: result._id,
        },
        });
    }catch(err){
        res.status(500).json(err);
    }
})

//Get Book by ID
router.get('/:bookId', async(req, res) => {
    try{
        const result = await BookModel.findById(req.params.bookId);
        res.status(200).json(result);
    }catch(err){
        res.status(500).json(err);
    }
});

//save a book
router.put('/save', async (req, res) => {
    const book = await BookModel.findById(req.body.bookID);
    const user = await UserModel.findById(req.body.userID);
    try{    
        user.savedBooks.push(book);
        await user.save();
        res.status(201).json({savedBooks: user.savedBooks});
    }catch(err){
        res.status(500).json(err);
    }
})

//Get ID of saved books
router.get('/savedBooks/ids/:userId', async(req, res)=>{
    try {
        const user = await UserModel.findById(req.params.userID);
        res.status(201).json({savedBooks: user?.savedBooks});
    } catch (err) {
        res.status(500).json(err)
    }
})

//Get saved recipes of userId
router.get('/savedBooks/:userId', async(req, res)=>{
    try {
        const user = await UserModel.findById(req.params.userID);
        const savedBooks = await BookModel.find({
            _id: {
                $in: user.savedBooks 
            },
        });

        console.log(savedBooks);
        res.status(201).json({savedBooks});
    } catch (err) {
        res.status(500).json(err)
    }
})

export { router as booksRouter  };

