import mongoose from "mongoose";
import { EventModel } from "../models/Event.js";
import {verifyToken} from './users.js';
import express from "express";
import { UserModel } from "../models/Users.js";

const router = express.Router();


router.get("/get-events", async(req, res)=>{ 
    try{
        const response = await EventModel.find({});
        res.status(200).json(response);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get("/get-events/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
      const response = await EventModel.find({ userOwner: userId });
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

router.get("/:id/show", async(req, res)=>{
    const id =   req.params.id
    const event = await Event.findById(id);
 
    try{
       res.status(200).json(event)

      
    }catch(err){
        handleError(err, res)
    }
});



router.post("/create-event", verifyToken, async(req, res)=>{
   
    const event = new EventModel({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        start: req.body.start,
        end: req.body.end,
        describe: req.body.describe,
        userOwner: req.body.userOwner,
    });
    console.log(event);

    try {
        const result = await event.save();
        res.status(201).json({
            createdEvent:{
                title: result.title,
                start: result.start,
                end: result.end,
                describe: result.describe,
                _id: result._id,
            }
        })
    } catch (err) {
        res.status(500).json(err);
    }
        
    }
)



router.put("/:id/update", async (req, res) => {
    const id = req.params.id;
    try {
      const event = await Event.findOne({ _id: id });
      if (event) {
        Object.assign(event, req.body);
        event.save((err, updatedEvent) => {
          if (err) {
            handleError(err, res);
          } else {
            res.status(200).json(updatedEvent);
          }
        });
      } else {
        res.status(404).json({ error: "Event not found" });
      }
    } catch (err) {
      console.log(err);
      handleError(err, res);
    }
  });
  
  router.delete("/delete-event/:eventId", async (req, res) => {
    const { eventId } = req.params;
  
    try {
      const event = await EventModel.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      await EventModel.findByIdAndRemove(eventId);
      res.status(200).json({ message: 'Event successfully deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  
  

export { router as eventsRouter }; 