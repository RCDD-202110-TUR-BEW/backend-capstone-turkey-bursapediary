require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { encryptCookieNodeMiddleware } = require('encrypt-cookie');
const DBConnection = require('./database/config');
const router = require('./routers');
const logger = require('./utils/logger');

const app = express();

const PORT = process.env.NODE_LOCAL_PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser(process.env.SECRET_KEY));
app.use(encryptCookieNodeMiddleware(process.env.SECRET_KEY));
app.use('/', router);

app.listen(PORT, () => {
  logger.info(`Server listening on http://localhost:${PORT}`);
  DBConnection();
});

module.exports = app;
