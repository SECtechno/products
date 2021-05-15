// const client = require('../db.js');
const apiError = require('../error.js');

const pool = require('../db.js');

// const { Pool } = require('pg');

// const pool = new Pool({
//   host: 'localhost',
//   database: 'products',
//   user: 'postgres',
//   password: 'postgres',
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// })


module.exports = (req, res) => {
  pool.connect((err, client, release) => {
    if (err) {
      console.log(err);
      return;
    }
    const id = req.params.product_id;
    Promise.all([
      client.query('SELECT * FROM products WHERE id = $1', [id]),
      client.query('SELECT * FROM features WHERE id_product = $1', [id])
    ])
      .then(([productData, featuresData]) => {
        release();
        const data = productData.rows[0];
        features = featuresData.rows.map(row => {
          const { feature, value } = row;
          return { feature, value };
        });
        data.features = features;
        res.send(data);
      })
      .catch(apiError(res));
  });
};
