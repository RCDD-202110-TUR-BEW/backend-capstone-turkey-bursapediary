require('dotenv').config();
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const { encryptCookieNodeMiddleware } = require('encrypt-cookie');
const swaggerUi = require('swagger-ui-express');
const elastic = require('./elasticsearch');
const SingletonMongoDB = require('./database/config');
const router = require('./routers');
const logger = require('./utils/logger');
const swaggerDocument = require('../swagger.json');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

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
    elastic.client
      .info()
      .then((response) => logger.info(response))
      .catch((error) => logger.error(error));
    logger.info(
      `Elasticsearch connected to ${elastic.client.connectionPool.cloudConnection.url.origin}`
    );
    logger.info(`Server listening on ${process.env.BASE_URL}:${PORT}`);
  });
}

module.exports = app;
