const readline = require('readline');
const fs = require('fs');

const filename = '../rawdata/product.csv';

async function processLineByLine(filename, handleLine) {
  const fileStream = fs.createReadStream(filename);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  for await (const line of rl) {
    if (!handleLine(line)) {
      break;
    }
  }
  console.log(`Done parsing csv file.`);
}

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
}

const isPrice = s => {
  const re = /^"?\$?([0-9. ]+)"?$/
  let exec = re.exec(s);
  if (exec === null) { return false; }
  return isNum(exec[1]);
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
}

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

const handleLine = (line) => {
  const data = splitCsvLine(line);

  let id, name, slogan, description, category, default_price;

  if (data.length === 6) {
    [id, name, slogan, description, category, default_price] = data;
  } else if (data.length === 5) {
    [id, name, description, category, default_price] = data;
  } else {
    console.log(line);
  }

  return true;
}


const main = async () => {
  const t1 = new Date();
  let result = await processLineByLine(filename, handleLine);
  const t2 = new Date();
  console.log('result', result);
  console.log(`Run time: ${(t2 - t1) / 1000} seconds.`);
};

main();