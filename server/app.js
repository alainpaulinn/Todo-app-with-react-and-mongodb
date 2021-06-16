import 'dotenv/config';

import express from 'express';

import cors from 'cors';

import client from './db.js';

import tasksRouter from './Extra task.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/tasks', tasksRouter);

const port = process.env.PORT || 4000;

app.listen(port, async () => {
    console.log(`Server is ready at port ${port}`);

    await client.connect();
    console.log('Database is ready');
});