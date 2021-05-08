const doEtlOnFile = require('./elt.js');
const { processLineByLine } = require('./readfile.js');
const { isNum, last, isCategory, isPrice, cleanPrice } = require('./utils.js');

const filename = '../rawdata/skus.csv';
const database = 'test';
const table = 'skus';
const fields = 'id id_style size quantity'.split(' ');

const handleLine = (db) => async (data) => {
  let id, styleId, size, quantity;

  if (data.length === 4) {
    [id, styleId, size, quantity] = data;
  }
   else if (data.length === 3) {
    [id, styleId, quantity] = data;
    size = null;
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
    && isNum(styleId)
    && isNum(quantity)
  )) {
    console.log('Couldn\'t process:', data);
    return true;
  }

  await db.addToQueue([id, styleId, size, quantity]);
  return true;
}

const main = async () => {
  console.log('Doing ELT for skus');
  doEtlOnFile({ filename, database, table, fields, handleLine });
}

main();

// delete from skus s WHERE NOT EXISTS (SELECT * FROM styles WHERE styles.id = s.id_style);