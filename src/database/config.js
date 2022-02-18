/* eslint-disable max-classes-per-file */
const mongoose = require('mongoose');
const logger = require('../utils/logger');

class PrivateSingleton {
  constructor() {
    const db = mongoose.connection;

    if (process.env.NODE_ENV === 'test') {
      this.URI = process.env.TEST_DB_URI;
    } else {
      this.URI = process.env.DB_URI;
    }
    mongoose.connect(this.URI, { useNewUrlParser: true });

    db.once('open', () => {
      logger.info(`Database connected: ${this.URI}`);
    });

    db.on('error', (err) => {
      logger.info(`Database connection error: ${err}`);
    });
  }
}
class SingletonMongoDB {
  constructor() {
    throw new Error('Use Singleton.getInstance()');
  }

  static getInstance() {
    if (!SingletonMongoDB.instance) {
      SingletonMongoDB.instance = new PrivateSingleton();
    }
    return SingletonMongoDB.instance;
  }
}

module.exports = SingletonMongoDB;
