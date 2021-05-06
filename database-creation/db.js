const writeDB = async (database, table, fields, rows) => {
  const { Client } = require('pg');
  const client = new Client({
    database,
    user: 'postgres',
    password: 'postgres',
  });
  await client.connect();

  const time1 = new Date();
  const fieldsStr = fields.join(',');
  let i = 0;
  while (i < rows.length) {
    const vals = [];
    const indexes = [];
    for (let j = 1; j <= 1000; j++) {
      vals.push(rows[i].toString());
      indexes.push(j);
      i += 1;
      if (i >= rows.length) {
        break;
      }
    }
    const idxStr = indexes.map(idx => `($${idx})`).join(',');
    const queryStr = `insert into ${table} (${fieldsStr}) values ${idxStr}`;
    const res = await client.query(queryStr, vals);
  }

  await client.end();
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

module.exports = { writeDB };
