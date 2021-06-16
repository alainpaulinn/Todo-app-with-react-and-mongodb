import express from 'express';
import mongodb from 'mongodb';
import { body, validationResult } from 'express-validator';

import { getCollection } from './db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const tasksCollection = getCollection('tasks');
    const taskDocs = await tasksCollection.find({}).toArray();
    res.send(taskDocs);
});

router.post(
    '/',
    body('title').notEmpty().isLength({ min: 5 }),
    body('isCompleted').isBoolean().optional(),
    async (req, res) => {
        const tasksCollection = getCollection('tasks');

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }

        const { title, isCompleted = false } = req.body;

        const newTask = { title, isCompleted };
        console.log(newTask);

        try {
            await tasksCollection.insertOne(newTask);
            res.status(201).send('Task added!');
        } catch (e) {
            res.status(500).send('Unknown error');
        }
    },
);

router.get('/:id', async (req, res) => {
    const tasksCollection = getCollection('tasks');
    const taskId = mongodb.ObjectID(req.params.id);

    const task = await tasksCollection.findOne({ _id: taskId });

    if (task) {
        res.send(task);
    } else {
        res.status(404).send('Not found');
    }
});

router.put(
    '/:id',
    body('title').notEmpty().isLength({ min: 5 }).optional(),
    body('isCompleted').isBoolean().optional(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }

        const taskCollection = getCollection('tasks');
        const taskID = mongodb.ObjectID(req.params.id);

        const { title, isCompleted } = req.body;

        const taskChanges = {};
        if (typeof title === 'string') {
            taskChanges.title = title;
        }
        if (typeof isCompleted === 'boolean') {
            taskChanges.isCompleted = isCompleted;
        }

        console.log(taskChanges);

        const task = await taskCollection.updateOne(
            { _id: taskID },
            { $set: taskChanges },
        );

        if (task) {
            res.send('Updated the task');
        } else {
            res.status(404).send('Task with this Id not found');
        }
    },
);

router.delete('/:id', async (req, res) => {
    const taskCollection = getCollection('tasks');
    const taskID = mongodb.ObjectID(req.params.id);
    const task = await taskCollection.deleteOne({ _id: taskID });

    if (task) {
        res.send('DELETE request completed');
    } else {
        res.status(404).send('Task with this Id not found');
    }
});

export default router;