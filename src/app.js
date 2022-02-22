require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { encryptCookieNodeMiddleware } = require('encrypt-cookie');
const swaggerUi = require('swagger-ui-express');
const DBConnection = require('./database/config');
const router = require('./routers');
const logger = require('./utils/logger');
const swaggerDocument = require('../swagger.json');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser(process.env.SECRET_KEY));
app.use(encryptCookieNodeMiddleware(process.env.SECRET_KEY));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', router);

app.listen(PORT, () => {
  logger.info(`Server listening on ${process.env.BASE_URL}:${PORT}`);
  DBConnection();
});

module.exports = app;
