const client = require('../db.js');
const apiError = require('../error.js');

const fromObj = (obj, ...keys) =>
  Object.fromEntries(keys.map(key => [key, obj[key]]));

module.exports = (req, res) => {
  const id = req.params.product_id;
  client.query('SELECT * FROM styles WHERE id_product = $1', [id])
    .then(stylesData => {
      const styles = Object.fromEntries(stylesData.rows.map(style => [style.id, {
        style_id: style.id,
        name: style.name,
        original_price: style.original_price,
        sale_price: style.sale_price,
        'default?': style.is_default,
        photos: [],
        skus: {},
      }]));
      const style_ids = Object.keys(styles);(req, res) => {
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
      console.log(data);
      res.send(data);
      console.log(`product details sent.`);
    })
    .catch(apiError(res));
}

      Promise.all([
        client.query(`SELECT * FROM skus WHERE id_style = ANY($1::int[])`, [style_ids]),
        client.query(`SELECT * FROM photos WHERE id_style = ANY($1::int[])`, [style_ids]),
      ])
        .then(([skusData, photosData]) => {
          const skus = skusData.rows;
          skus.forEach(sku => {
            styles[sku.id_style].skus[sku.id] = fromObj(sku, 'quantity', 'size');
          });
          const photos = photosData.rows;
          photos.forEach(photo =>
            styles[photo.id_style].photos.push(fromObj(photo, 'url', 'thumbnail_url')));
          const result = { product_id: id, results: Object.values(styles) };
          console.log('STYLES', JSON.stringify(result, null, 2));
          res.send(result);
        })
    })
    .catch(apiError(res));
};

