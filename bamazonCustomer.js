require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: `${process.env.DB_PASS}`,
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    queryProducts();
});

function queryProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log(results);
    })
}

function buyProduct() {
    inquirer.prompt([
        {
            name: "buyId",
            type: "input",
            message: "Which item would you like to buy? (ItemID)"
        },
        {
            name: "buyQuantity",
            type: "input",
            message: "How many would you like to buy?"
        }

    ]).then(function(answer) {

    })



}