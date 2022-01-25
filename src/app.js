require('dotenv').config();
const express = require('express');

const DBConnection = require('./database/config');
const router = require('./routers');
const logger = require('./utils/logger');

const app = express();

const PORT = process.env.NODE_LOCAL_PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', router);

app.listen(PORT, () => {
  logger.info(`Server listening on http://localhost:${PORT}`);
  DBConnection();
});

module.exports = app;
