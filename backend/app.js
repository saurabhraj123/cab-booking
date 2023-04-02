const mongoose = require('mongoose');
const db = require('./utils/db');
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()

app.use(cors({ origin: `${process.env.FRONTEND_URI}` }));
app.use(express.json());

const mainRouter = require('./routes/mainRouter');
app.use('/api', mainRouter);

const PORT = process.env.PORT || 5500;

app.listen(PORT, console.log('Listening on port 5500'));