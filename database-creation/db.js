let client;

const init = async (database) => {
  const { Client } = require('pg');
  client = new Client({
    database,
    user: 'postgres',
    password: 'postgres',
  });
  await client.connect();
}

const close = async () => {
  await client.end();
};

const write = async (table, fields, rows) => {
  debugger;

  const time1 = new Date();
  const fieldsStr = fields.join(',');
  let i = 0;
  const rowsPerQuery = 1000;
  debugger;
  while (i < rows.length) {
    const vals = [];
    let index = 1;
    let indexStrs = [];
    for (let j = 1; j <= rowsPerQuery; j++) {
      if (rows[i].length !== fields.length) {
        console.error('ERROR');
        console.error('rows[i]:', rows[i]);
        console.error('fields:', fields);
        throw 'Row length doesn\'t match fields length';
      }
      vals.push(...rows[i].map(x => x.toString()));
      const indexes = [];
      for (let k = 0; k < rows[i].length; k++) {
        indexes.push(index++);
      }
      indexStrs.push(`(${indexes.map(x => '$' + x).join(',')})`);
      i += 1;
      if (i >= rows.length) {
        break;
      }
    }
    const queryStr = `insert into ${table} (${fieldsStr}) values ${indexStrs.join(',')}`;
    // console.log(queryStr, vals, '\n\n\n\n');
    debugger;
    const res = await client.query(queryStr, vals);
  }

  const time2 = new Date();
  console.log(`Time to write records to DB: ${(time2 - time1) / 1000}`)
};

/*
(async () => {
  const fields = ['number'];
  const vals = [];
  for (let i = 0; i < 1000000; i++) {
    vals.push(Math.floor(Math.random() * 1e8));
  }
  writeDB('test', 'numbers', fields, vals);
})();
 */

module.exports = { init, write, close };
