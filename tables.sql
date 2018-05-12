CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT,
  description TEXT,
  price DECIMAL(18,2),
  quantity INT
);

CREATE TABLE IF NOT EXISTS invoices (
  id SERIAL PRIMARY KEY,
  client TEXT,
  gross_amount DECIMAL(18,2),
  afterGST DECIMAL(18,2),
  discount DECIMAL(18,2),
  total_amount DECIMAL(18,2),
  paid_status TEXT,
  amount_payable DECIMAL(18,2),
  date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS invoice_item (
  id SERIAL PRIMARY KEY,
  products_id INT REFERENCES products(id),
  invoices_id INT REFERENCES invoices(id),
  quantity INT,
  cost DECIMAL(18,2)
);