DROP TABLE IF EXISTS product;
CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  name TEXT,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price DECIMAL
);

DROP TABLE IF EXISTS style;
CREATE TABLE style (
  id SERIAL PRIMARY KEY,
  id_product INTEGER,
  name VARCHAR,
  original_price DECIMAL,
  sale_price DECIMAL NULL DEFAULT NULL,
  default? bit NULL DEFAULT 0,
  PRIMARY KEY (id)
);
ALTER TABLE style ADD FOREIGN KEY (id_product) REFERENCES product (id);

DROP TABLE IF EXISTS feature;
CREATE TABLE feature (
  id SERIAL PRIMARY KEY,
  id_product INTEGER,
  feature MEDIUMTEXT,
  value MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);
ALTER TABLE feature ADD FOREIGN KEY (id_product) REFERENCES product (id);

CREATE TABLE photo (
  id SERIAL PRIMARY KEY,
  id_style INTEGER,
  thumbnail_url VARCHAR,
  url VARCHAR,
  PRIMARY KEY (id)
);
ALTER TABLE photo ADD FOREIGN KEY (id_style) REFERENCES style (id);

CREATE TABLE sku (
  id SERIAL PRIMARY KEY,
  id_style INTEGER,
  sku_no INTEGER,
  quantity INTEGER,
  size VARCHAR,
  PRIMARY KEY (id)
);
ALTER TABLE sku ADD FOREIGN KEY (id_style) REFERENCES style (id);

DROP TABLE IF EXISTS related;
CREATE TABLE related (
  id SERIAL PRIMARY KEY,
  id_product1 INTEGER,
  id_product2 INTEGER,
  PRIMARY KEY (id)
);
ALTER TABLE related ADD FOREIGN KEY (id_product1) REFERENCES product (id);
ALTER TABLE related ADD FOREIGN KEY (id_product2) REFERENCES product (id);
