const doEtlOnFile = require('./elt.js');
const { processLineByLine } = require('./readfile.js');
const { isNum, last, isCategory, isPrice, cleanPrice } = require('./utils.js');

const filename = '../rawdata/photos.csv';
const database = 'test';
const table = 'photos';
const fields = 'id id_style url thumbnail_url'.split(' ');

const handleLine = (db) => async (data) => {
  let id, styleId, size, quantity;

  if (data.length === 4) {
    [id, styleId, url, thumbnail_url] = data;
  }
   else if (data.length === 3) {
    [id, styleId, url] = data;
    thumbnail_url = url;
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
  )) {
    console.log('Couldn\'t process:', data);
    return true;
  }

  await db.addToQueue([id, styleId, url, thumbnail_url]);
  return true;
}

const main = async () => {
  console.log('Doing ELT for photos');
  doEtlOnFile({ filename, database, table, fields, handleLine });
}

main();

// delete from photos p WHERE NOT EXISTS (SELECT * FROM styles WHERE styles.id = p.id_style);
// select count(*) from photos p WHERE NOT EXISTS (SELECT * FROM styles WHERE styles.id = p.id_style);