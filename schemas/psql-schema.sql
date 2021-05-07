DROP TABLE IF EXISTS products;
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price DECIMAL
);

DROP TABLE IF EXISTS styles;
CREATE TABLE styles (
  id INTEGER PRIMARY KEY,
  id_product INTEGER,
  name TEXT,
  original_price DECIMAL,
  sale_price DECIMAL,
  is_default BOOL NULL DEFAULT FALSE
);
ALTER TABLE styles ADD FOREIGN KEY (id_product) REFERENCES products (id);

DROP TABLE IF EXISTS features;
CREATE TABLE features (
  id INTEGER PRIMARY KEY,
  id_product INTEGER,
  feature TEXT,
  value TEXT NULL DEFAULT NULL
);
ALTER TABLE features ADD FOREIGN KEY (id_product) REFERENCES products (id);

DROP TABLE IF EXISTS photos;
CREATE TABLE photos (
  id INTEGER PRIMARY KEY,
  id_style INTEGER,
  thumbnail_url TEXT,
  url TEXT
);
ALTER TABLE photos ADD FOREIGN KEY (id_style) REFERENCES styles (id);

DROP TABLE IF EXISTS skus;
CREATE TABLE skus (
  id INTEGER PRIMARY KEY,
  id_style INTEGER,
  quantity INTEGER,
  size TEXT
);
ALTER TABLE skus ADD FOREIGN KEY (id_style) REFERENCES styles (id);

DROP TABLE IF EXISTS related;
CREATE TABLE related (
  id INTEGER PRIMARY KEY,
  id_product1 INTEGER,
  id_product2 INTEGER
);
ALTER TABLE related ADD FOREIGN KEY (id_product1) REFERENCES products (id);
ALTER TABLE related ADD FOREIGN KEY (id_product2) REFERENCES products (id);
