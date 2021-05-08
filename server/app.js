const express = require('express');

const app = express();

app.get('/test', (req, res) => {
  console.log('Waiting 4 seconds...');
  setTimeout(() => res.send('test result'), 4000);
});

app.get('/products', require('./routes/products.js'));
app.get('/products/:product_id', require('./routes/details.js'));
app.get('/products/:product_id/styles', require('./routes/styles.js'));
app.get('/products/:product_id/related', require('./routes/related.js'));

module.exports = app;
