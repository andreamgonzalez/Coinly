CREATE TABLE companies (
  handle VARCHAR(25) PRIMARY KEY CHECK (handle = lower(handle)),
  name TEXT UNIQUE NOT NULL,
  num_employees INTEGER CHECK (num_employees >= 0),
  description TEXT NOT NULL,
  logo_url TEXT
);

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
  -- company_handle VARCHAR(25) NOT NULL
  --   REFERENCES companies ON DELETE CASCADE
);

CREATE TABLE favorites (
  username VARCHAR(25)
    REFERENCES users ON DELETE CASCADE,
  coin_id INTEGER
    REFERENCES coins ON DELETE CASCADE,
  PRIMARY KEY (username, coin_id)
);
