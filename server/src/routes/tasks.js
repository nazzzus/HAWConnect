import express from 'express';
import mongoose from 'mongoose';
import { TaskModel } from '../models/Task.js';
import {verifyToken} from './users.js';
import { UserModel } from '../models/Users.js';

const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const response = await TaskModel.find({});
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json(err);
    }
})


router.post('/add', verifyToken, async (req, res) => {
    const task = new TaskModel({
        _id: new mongoose.Types.ObjectId(),
        task: req.body.task,
        completed: req.body.completed,
        userOwner: req.body.userOwner,
    });
    console.log(task);

    try {
        const result = await task.save();
        res.status(201).json({
            createdTask:{
                task: result.task,
                completed: result.completed,
                _id: result._id,
            },
        });
    } catch (err) {
        res.status(500).json(err);
    }
}) 

router.get('/savedTasks/:userId', async(req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        const savedTasks = await TaskModel.find({
            _id: {
                $in: user.savedTasks
            },
        });
        
        console.log(savedTasks);
        res.status(201).json({savedTasks});
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete('/:taskId', verifyToken, async (req, res) => {
    const taskId = req.params.taskId;
  
    try {
      const deletedTask = await TaskModel.findByIdAndDelete(taskId);
      if (deletedTask) {
        res.status(200).json({ message: 'Task successfully deleted' });
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

router.put('/save', async(req, res) => {
    const task = await TaskModel.findById(req.body.taskID);
    const user = await UserModel.findById(req.body.userID);
    try {
        user.savedTasks.push(task);
        await user.save();
        res.status(201).json({savedTasks: user.savedTasks});
    } catch (err) {
        res.status(500).json(err);
    }
})

export { router as tasksRouter  };