require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { encryptCookieNodeMiddleware } = require('encrypt-cookie');
const swaggerUi = require('swagger-ui-express');
const SingletonMongoDB = require('./database/config');
const router = require('./routers');
const logger = require('./utils/logger');
const swaggerDocument = require('../swagger.json');

const app = express();

const PORT = process.env.NODE_LOCAL_PORT;

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static(`${__dirname}/views`));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser(process.env.SECRET_KEY));
app.use(encryptCookieNodeMiddleware(process.env.SECRET_KEY));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', router);

SingletonMongoDB.getInstance();

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    logger.info(`Server listening on http://localhost:${PORT}`);
  });
}

module.exports = app;
