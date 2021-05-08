const client = require('../db.js');
const apiError = require('../error.js');

module.exports = (req, res) => {
  // params: page = 1, count = 5
  const page = /page=([0-9]+)/.exec(req.url)?.[1] || 1;
  const count = /count=([0-9]+)/.exec(req.url)?.[1] || 5;

  const offset = (page - 1) * count;

  client.query('SELECT * FROM products LIMIT $1 OFFSET $2', [count, offset])
    .then(data => {
      res.send(data.rows);
      console.log(`${count} products returned.`)
    })
    .catch(apiError(res));
};
