const doEtlOnFile = require('./elt.js');
const { processLineByLine } = require('./readfile.js');
const { isNum, last, isCategory, isPrice, cleanPrice } = require('./utils.js');

const filename = '../rawdata/related.csv';
const database = 'test';
const table = 'related';
const fields = 'id id_product1 id_product2'.split(' ');

const handleLine = (db) => async (data) => {
  let id, id_product1, id_product2;

  if (data.length === 3) {
    [id, id_product1, id_product2] = data;
  }
  else {
    console.log('Couldn\'t process:', data);
    return true;
  }

  if (id === 'id') {
    return true;
  }

  if (!(
    isNum(id)
    && isNum(id_product1)
    && isNum(id_product2)
  )) {
    console.log('Couldn\'t process:', data);
    return true;
  }

  await db.addToQueue([id, id_product1, id_product2]);
  return true;
}

const main = async () => {
  console.log('Doing ELT for related');
  doEtlOnFile({ filename, database, table, fields, handleLine });
}

main();

// delete from related r WHERE NOT EXISTS (SELECT * FROM products p WHERE p.id = r.id_product1);
// delete from related r WHERE NOT EXISTS (SELECT * FROM products p WHERE p.id = r.id_product2);
// select count(*) from related r WHERE NOT EXISTS (SELECT * FROM products p WHERE p.id = r.id_product1);