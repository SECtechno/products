const doEtlOnFile = require('./elt.js');
const { processLineByLine } = require('./readfile.js');
const { isNum, last, isCategory, isPrice, cleanPrice } = require('./utils.js');

const filename = '../rawdata/features.csv';
const database = 'products';
const table = 'features';
const fields = 'id id_product feature value'.split(' ');

const handleLine = (db) => async (data) => {
  let id, productId, feature, value;

  if (data.length === 4) {
    [id, productId, feature, value] = data;
  } else if (data.length === 3) {
    [id, productId, feature] = data;
    value = null;
  }

  if (id === 'id') {
    return true;
  }

  if (!(
    isNum(id)
    && isNum(productId)
  )) {
    console.log('Couldn\'t process:', data);
    return true;
  }

  await db.addToQueue([id, productId, feature, value]);
  return true;
}

const main = async () => {
  console.log('Doing ELT for features');
  doEtlOnFile({ filename, database, table, fields, handleLine });
}

main();

// select count(*) from features f WHERE NOT EXISTS (SELECT * FROM products p WHERE p.id = f.id_product);

// delete from features f WHERE NOT EXISTS (SELECT * FROM products p WHERE p.id = f.id_product);
