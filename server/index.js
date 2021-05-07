const express = require('express');
const app = express();
const port = 3000;

const { Client } = require('pg');
client = new Client({
  database: 'products',
  user: 'postgres',
  password: 'postgres',
});
client.connect();

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.get('/products', (req, res) => {
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

});

app.get('/products/:product_id', (req, res) => {
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
});

const fromObj = (obj, ...keys) => {
  return Object.fromEntries(keys.map(key => [key, obj[key]]));

  // const res = {};
  // for (const key of keys) { res[[key]] = obj[key]; }
  // return res;
}

app.get('/products/:product_id/styles', (req, res) => {
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
      const style_ids = Object.keys(styles);

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
          res.send('STUFF');

        })
        .catch(apiError(res));
    })
    .catch(apiError(res));
});

app.get('/products/:product_id/related', (req, res) => { });

const apiError = res => error => {
  console.error('ERROR:', error);
  res.status(400).end();
};

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
});