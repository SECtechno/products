const { Client } = require('pg');

class Db {
  constructor(database) {
    this.database = database;
    this.queue = [];
    this.rowsPerQuery = 100;
  }

  set table(table) {
    this._table = table;
  }

  set fields(fields) {
    this._fields = fields;
  }

  async flushQueue() {
    await this.write(this.queue);
    this.queue.length = 0;
  };

  async addToQueue(data) {
    this.queue.push(data);
    if (this.queue.length >= this.rowsPerQuery) {
      await this.flushQueue(this.queue);
    }
  }

  async init() {
    this.client = new Client({
      database: this.database,
      user: 'postgres',
      password: 'postgres',
    });
    await this.client.connect();
  }

  async close() {
    await this.client.end();
  };

  async write (rows) {
    const time1 = new Date();
    const fieldsStr = this._fields.join(',');
    let i = 0;
    const rowsPerQuery = 1000;
    while (i < rows.length) {
      const vals = [];
      let index = 1;
      let indexStrs = [];
      for (let j = 1; j <= rowsPerQuery; j++) {
        if (rows[i].length !== this._fields.length) {
          console.error('ERROR');
          console.error('rows[i]:', rows[i]);
          console.error('fields:', this._fields);
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
      const queryStr = `insert into ${this._table} (${fieldsStr}) values ${indexStrs.join(',')}`;
      const res = await this.client.query(queryStr, vals);
    }

    const time2 = new Date();
  };
}

module.exports = Db;
