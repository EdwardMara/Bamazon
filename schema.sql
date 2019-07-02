DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

use bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(25) NOT NULL,
    price DECIMAL default 0,
    stock_quantity INT default 0,
    PRIMARY KEY (item_id)

)