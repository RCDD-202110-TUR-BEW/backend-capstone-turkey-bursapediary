require('dotenv').config();
const express = require('express');
const jwt = require('express-jwt');
const DBConnection = require('./database/config');
const router = require('./routers');
const logger = require('./utils/logger');

const app = express();

const PORT = process.env.NODE_LOCAL_PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  '/',
  jwt({
    secret: process.env.SECRET_KEY,
    algorithms: ['HS256'],
  })
);
app.use('/', router);

app.listen(PORT, () => {
  logger.info(`Server listening on http://localhost:${PORT}`);
  DBConnection();
});

module.exports = app;
