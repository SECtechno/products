const client = require('../db.js');
const apiError = require('../error.js');

module.exports = (req, res) => {
  const id = req.params.product_id;
  client.query('SELECT * FROM related WHERE id_product1 = $1', [id])
    .then(relatedData => {
      const related = relatedData.rows.map(row => row.id_product2);
      console.log('Returning related for', id);
      res.send(related);
    })
    .catch(apiError(res));
};
