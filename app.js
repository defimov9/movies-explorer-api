require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHandler = require('./middlewares/errorsHandler');

const router = require('./routes/index');

const {
  PORT,
  MONGODB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

const app = express();

app.use(cors());
app.use(helmet());

app.use(express.json());

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errorsHandler);

app.listen(PORT);
