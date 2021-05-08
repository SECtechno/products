const { Client } = require('pg');

client = new Client({
  database: 'products',
  user: 'postgres',
  password: 'postgres',
});

client.connect();

module.exports = client;
