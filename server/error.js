const apiError = res => error => {
  console.error('ERROR:', error);
  res.status(400).end();
};

module.exports = apiError;
