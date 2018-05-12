CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name text,
  description text,
  price DECIMAL(18,2),
  quantity integer
);