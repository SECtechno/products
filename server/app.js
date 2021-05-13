const express = require('express');

const app = express();

app.get('/test', (req, res) => {
  console.log('Test route');
  const toneRow = [...new Array(12)].map((_, i) => [Math.random(), i]).sort().map(x => x[1]).join(' ') + '\n';
  res.send(toneRow);
});

app.get('/products', require('./routes/products.js'));
app.get('/products/:product_id', require('./routes/details.js'));
app.get('/products/:product_id/styles', require('./routes/styles.js'));
app.get('/products/:product_id/related', require('./routes/related.js'));

module.exports = app;
