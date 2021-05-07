const readline = require('readline');
const fs = require('fs');

class LogUpdate {
  constructor(interval) {
    this.startTime = new Date();
    this.lastTime = this.startTime;
    this.interval = interval * 1000;
  }

  log(...args) {
    if (new Date() - this.lastTime >= this.interval) {
      console.log(...args);
      this.lastTime = new Date();
    }
  }
}

async function processLineByLine(filename, handleLine, linesToHandle = Infinity) {
  const fileStream = fs.createReadStream(filename);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const logUpdate = new LogUpdate(1);

  let linesDone = 0;

  for await (const line of rl) {
    if (!(await handleLine(splitCsvLine(line)))) {
      break;
    }
    linesDone += 1;
    logUpdate.log('Lines done:', linesDone);

    if (linesToHandle-- <= 0) {
      break;
    }
  }
  console.log(`Done parsing csv file.`);
}

const splitCsvLine = (line) => {
  const res = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === '"') {
      i += 1;
      const j = line.indexOf('"', i);
      if (j !== -1) {
        res.push(line.slice(i, j));
        i = line.indexOf(',', j);
        if (!~i) {
          break;
        } else {
          i += 1;
        }
      } else {
        res.push(line.slice(i));
        break;
      }
    } else {
      const j = line.indexOf(',', i);
      if (~j) {
        res.push(line.slice(i, j));
        i = j + 1;
      } else {
        res.push(line.slice(i));
        break;
      }
    }
  }
  return res;
};



/*
// Test splitScvLine
const test = (input, expected) => {
  const actual = JSON.stringify(splitCsvLine(input));
  expected = JSON.stringify(expected);
  if (actual === expected) {
    console.log('pass');
  } else {
    console.log(`FAIL: for ${input}, expected ${expected} but got ${actual}`);
  }
}

test('foo,bar,baz', ['foo', 'bar', 'baz']);
test('a,,,b,,,,c', ['a', '', '', 'b', '', '', '', 'c']);
test('', []);
test('1,2,"abc","def,ghi"', ['1', '2', 'abc', 'def,ghi']);
test('""', ['']);
test('"just,one,item"', ['just,one,item']);
 */

module.exports = { processLineByLine };