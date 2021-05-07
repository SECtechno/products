const doEtlOnFile = require('./elt.js');

const filename = '../rawdata/product.csv';
const database = 'test';
const table = 'products';
const fields = 'id,name,slogan,description,category,default_price'.split(',');

const isNum = s => !Number.isNaN(Number(s));

const last = arr => arr[arr.length - 1];

const isCategory = s => {
  if (s.split(' ').length > 2) {
    return false;
  }
  if (/([0-9])/.test(s)) {
    return false;
  }
  return true;
};

const isPrice = s => {
  const re = /^"?\$?([0-9. ]+)"?$/
  let exec = re.exec(s);
  if (exec === null) { return false; }
  return isNum(exec[1]);
};

const cleanPrice = s => /([0-9.]+)/.exec(s)[0];

const handleLine = (db) => async (data) => {
  let id, name, slogan, description, category, default_price;

  if (data.length === 6) {
    [id, name, slogan, description, category, default_price] = data;
  } else if (data.length === 5) {
    [id, name, description, category, default_price] = data;
    slogan = '';
  } else {
    console.log('Couldn\'t process:', line);
    return true;
  }
  if (id === 'id') {
    return true;
  }
  default_price = cleanPrice(default_price);

  await db.addToQueue([id, name, slogan, description, category, default_price]);
  return true;
}

const main = () => {
  console.log('Doing ELT for products');
  doEtlOnFile({ filename, database, table, fields, handleLine });
}

module.exports = main;
