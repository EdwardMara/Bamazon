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
        buyProduct();
        
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
        var buyId = answer.buyId;
        var buyQuantity = answer.buyQuantity;

        connection.query("SELECT * FROM products WHERE ?",{item_id: buyId},function(err, res){
            if (err) throw err;
            // console.log(res[0].stock_quantity);
            var quantity = res[0].stock_quantity;
            if(buyQuantity <= quantity){
                var cost = buyQuantity * res[0].price;
                var updateQuantity = quantity - buyQuantity;
                console.log(`That will cost $${cost}, and there are ${updateQuantity} left.`);
                connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: updateQuantity
                    },
                    {
                        item_id: buyId
                    }
                ]);
                //TODO: ask user if to go back to item list or end connection
                inquirer.prompt(
                    {
                        name:"reset",
                        type:"list",
                        choices: ["Yes", "No"],
                        message: "Would you like to continue shopping?"

                    }
                ).then(function(answer){
                    if (answer.reset === "Yes"){
                        queryProducts();
                    }else{
                        connection.end();
                    }
                });
                
            }else{
                console.log("Insufficient Stock!")
                //TODO: ask user if to go back to item list or end connection
                inquirer.prompt(
                    {
                        name:"reset",
                        type:"list",
                        choices: ["Yes", "No"],
                        message: "Would you like to continue shopping?"

                    }
                ).then(function(answer){
                    if (answer.reset === "Yes"){
                        queryProducts();
                    }else{
                        connection.end();
                    }
                });
                
            }
        });
    })



}