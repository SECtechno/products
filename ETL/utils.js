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
};

const isPrice = s => {
  const re = /^"?\$?([0-9. ]+)"?$/
  let exec = re.exec(s);
  if (exec === null) { return false; }
  return isNum(exec[1]);
};

const cleanPrice = s => {
  try {
    return /([0-9.]+)/.exec(s)[0];
  } catch (error) {
    console.error('cleanPrice error on:', s);
  }
}

module.exports = {
  isNum, last, isCategory, isPrice, cleanPrice
};
