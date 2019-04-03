DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
 item_id INT NOT NULL AUTO_INCREMENT,
 product_name VARCHAR(80) NOT NULL,
 department_name VARCHAR(45) NULL,
 price DECIMAL(10,2) NOT NULL,
 stock_quantity INT NULL,
 PRIMARY KEY (item_id)
);

INSERT INTO products ( product_name, department_name, price, stock_quantity )
VALUES ( "Colgate", "Toiletries", "3.99", "1000" );

INSERT INTO products ( product_name, department_name, price, stock_quantity )
VALUES ( "Old Spice", "Toiletries", "4.99", "1000" );

INSERT INTO products ( product_name, department_name, price, stock_quantity )
VALUES ( "Dove", "Toiletries", "3.99", "2000" );

INSERT INTO products ( product_name, department_name, price, stock_quantity )
VALUES ( "Polo T-shirt", "Clothing", "60.99", "800" );

INSERT INTO products ( product_name, department_name, price, stock_quantity )
VALUES ( "Swiss Army Pocket Knife", "Outdoors", "10.99", "40" );

INSERT INTO products ( product_name, department_name, price, stock_quantity )
VALUES ( "Microsoft Surface Pro 4", "Computer", "1299", "100" );

INSERT INTO products ( product_name, department_name, price, stock_quantity )
VALUES ( "Bluetooth Headphones", "Consumer Electronics", "39.99", "800" );

INSERT INTO products ( product_name, department_name, price, stock_quantity )
VALUES ( "Tire pump", "Automotive", "39.99", "100" );

INSERT INTO products ( product_name, department_name, price, stock_quantity )
VALUES ( "Bowflex Dumbbells", "Fitness", "499.99", "50" );

SELECT * FROM products;