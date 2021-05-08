const doEtlOnFile = require('./elt.js');
const { processLineByLine } = require('./readfile.js');

const filename = '../rawdata/styles.csv';
const database = 'test';
const table = 'styles';
const fields = 'id id_product name sale_price original_price is_default'.split(' ');

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

const cleanPrice = s => {
  try {
    return /([0-9.]+)/.exec(s)[0];
  } catch (error) {
    console.error('cleanPrice error on:', s);
  }
}

const handleLine = (db) => async (data) => {
  let id, productId, name, sale_price, original_price, default_style;

  if (data.length === 6) {
    [id, productId, name, sale_price, original_price, default_style] = data;
  } else if (data.length === 5) {
    [id, productId, name, original_price, default_style] = data;
    salePrice = 'null';
    return true;
  }

  if (id === 'id') {
    return true;
  }

  original_price = cleanPrice(original_price);
  if (sale_price === 'null') {
    sale_price = null;
  } else {
    sale_price = cleanPrice(sale_price);
  }

  if (!(
    isNum(id)
    && isNum(productId)
    && isPrice(original_price)
    && (isPrice(sale_price) || sale_price === null)
    && (default_style === '0' || default_style === '1')
  )) {
    console.log('Couldn\'t process:', data);
    return true;
  }

  await db.addToQueue([id, productId, name, sale_price, original_price, default_style]);

  return true;
}

const main = async () => {
  console.log('Doing ELT for styles');
  doEtlOnFile({ filename, database, table, fields, handleLine });
}

module.exports = main;
