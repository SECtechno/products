const { Client } = require('pg');

// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

client = new Client({
  database: 'products',
  user: 'postgres',
  password: 'postgres',
  host: '18.191.232.241',
//  host: '172.31.18.153',
  port: 5432,
//  ssl: true,
 // connectionString: 'http://18.191.232.241:5432'


});


client.connect()
  .catch(err => {
    console.log('CLIENT CONNECT ERROR', err);
});


module.exports = client;
