const mongoose = require('mongoose');
const db = require('./utils/db');
const express = require('express');
const cors = require('cors');
const app = express();

// const DB = 'mongodb+srv://me4saurabh4work:9yMEsUCgXwEMJVr8@cab.ck3g351.mongodb.net/?retryWrites=true&w=majority';
// mongoose.connect(DB)s
//     .then(() => console.log('Connected to database...'))
//     .catch((err) => console.log('Database connection error...'));

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const mainRouter = require('./routes/mainRouter');
app.use('/api', mainRouter);

app.listen(5500, console.log('Listening on port 5500'));