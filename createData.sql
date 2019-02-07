DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;
USE bamazon;
CREATE table products (item_id INT NOT NULL auto_increment, product_name VARCHAR (100), department_name VARCHAR (100)
						, price DECIMAL (10,4), stock_quanity INT, PRIMARY KEY (item_id));
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES
 ('TV','Electronics',300.00, 12)
,('Mascara','Beauty',8.99, 25)
,('The Theory of Everything','Entertainment',20.00, 6)
,('Body Wash','Beauty',5.99, 15)
,('Headphones','Electronics',40.00, 10)
,('Nike Shoes','Clothing',85.00, 8)
,('Bouncy Ball','Childrens',2.99, 13)
,('La Croix','Grocery',10.00, 15)
,('Basketball','Outdoors',19.99, 2)
,('Football','Outdoors',19.99, 4);

SELECT * 
FROM products;

