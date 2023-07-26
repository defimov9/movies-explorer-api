require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const {
  PORT,
  MONGODB_URL = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;

const app = express();

app.use(cors());
app.use(helmet());

mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URL, { useNewUrlParser: true });

app.listen(PORT);
