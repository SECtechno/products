const client = require('../db.js');
const apiError = require('../error.js');


module.exports = (req, res) => {
  const id = req.params.product_id
  Promise.all([
    client.query('SELECT * FROM products WHERE id = $1', [id]),
    client.query('SELECT * FROM features WHERE id_product = $1', [id])
  ])
    .then(([productData, featuresData]) => {
      const data = productData.rows[0];
      features = featuresData.rows.map(row => {
        const { feature, value } = row;
        return { feature, value };
      });
      data.features = features;
      data.test = 'TEST';
      // console.log(data);
      res.send(data);
      console.log(`product details sent for product ${id}`);
    })
    .catch(apiError(res));
}
