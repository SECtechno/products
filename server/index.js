const express = require('express');

const client = require('./db.js');
const app = express();
const port = 3000;

app.get('/products', require('./routes/products.js'));
app.get('/products/:product_id', require('./routes/details.js'));
app.get('/products/:product_id/styles', require('./routes/styles.js'));
app.get('/products/:product_id/related', require('./routes/related.js'));

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
});