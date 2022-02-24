const { Client } = require('@elastic/elasticsearch');

exports.client = new Client({
  cloud: {
    id: process.env.ELASTICSEARCH_CLOUD_ID,
  },
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD,
  },
});
