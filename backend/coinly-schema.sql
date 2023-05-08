CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE coins (
  id SERIAL PRIMARY KEY,
  symbol TEXT NOT NULL,
  price INTEGER CHECK (price >= 0)
);

CREATE TABLE favorites (
  username VARCHAR(25)
    REFERENCES users ON DELETE CASCADE,
  coin_id INTEGER
    REFERENCES coins ON DELETE CASCADE,
  PRIMARY KEY (username, coin_id)
);
