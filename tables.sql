CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT,
  description TEXT,
  price DECIMAL(18,2),
  quantity INT
);

CREATE TABLE IF NOT EXISTS invoices (
  id SERIAL PRIMARY KEY,
  gross_amount DECIMAL(18,2),
  GST DECIMAL(18,2),
  discount DECIMAL(18,2),
  net_amount DECIMAL(18,2)
);

CREATE TABLE IF NOT EXISTS invoice_item (
  id SERIAL PRIMARY KEY,
  products_id INT REFERENCES products(id),
  invoices_id INT REFERENCES invoices(id),
  quantity INT,
  amount DECIMAL(18,2)
);