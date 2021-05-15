const { Client } = require('pg');
const { Pool } = require('pg');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

// client = new Client({
//   database: 'products',
//   user: 'postgres',
//   password: 'postgres',
//   host: '18.191.232.241',
//   //  host: '172.31.18.153',
//   port: 5432,
//   //  ssl: true,
//   // connectionString: 'http://18.191.232.241:5432'


// });

// let pool

// // client.connect()
//   // .then(res => {
//     console.log('DB CONNECTED');
//     const pool = new Pool({
//       host: '18.191.232.241',
//       port: '5432',
//       database: 'products',
//       user: 'postgres',
//       password: 'postgres',
//       max: 20,
//       idleTimeoutMillis: 30000,
//       connectionTimeoutMillis: 2000,
//     });
//     module.exports = pool;
//   })
//   .catch(err => {
//     console.log('DB CONNECT ERROR', err);
//   });



const pool = new Pool({
  host: '18.191.232.241',
  database: 'products',
  user: 'postgres',
  password: 'postgres',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

module.exports = pool;

// module.exports = client;