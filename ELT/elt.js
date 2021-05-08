const Db = require('./db.js');
const { processLineByLine } = require('./readfile.js');

const doEtlOnFile = async ({ filename, database, table, fields, handleLine }) => {
  const db = new Db(database);
  console.log('running');

  await db.init();
  db.table = table;
  db.fields = fields;

  try {
    const t1 = new Date();
    let result = await processLineByLine(filename, handleLine(db));
    debugger;
    await db.flushQueue();
    const t2 = new Date();
    console.log('result', result);
    console.log(`Run time: ${(t2 - t1) / 1000} seconds.`);
  } catch (error) {
    console.error(`Error while processing ${filename}: ${error}`);
  } finally {
    await db.close();
    console.log('DB closed.');
  }
};

module.exports = doEtlOnFile;
