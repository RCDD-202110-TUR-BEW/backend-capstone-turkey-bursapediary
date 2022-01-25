const mongoose = require('mongoose');
const logger = require('../utils/logger');

const URI = process.env.DB_URI;

const DBConnection = () => {
  mongoose.connect(URI, { useNewUrlParser: true });

  const db = mongoose.connection;

  db.once('open', () => {
    logger.info(`Database connected: ${URI}`);
  });

  db.on('error', (err) => {
    logger.info(`Database connection error: ${err}`);
  });
};

module.exports = DBConnection;
