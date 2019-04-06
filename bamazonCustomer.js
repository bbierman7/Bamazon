var mysql = require("mysql");
var inquirer = require("inquirer");
var totalCost;
var Table = require('cli-table');
// instantiate
var table = new Table({
    head: ['ID', 'Product Name', 'Department', 'Price', 'Inventory' ]
  , colWidths: [5, 30, 35, 15, 20]
});
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "adidas87!",
    database: "bamazon_db"
});

//==========================================================================

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
    displayTable();
});

//==========================================================================

//display table of items that customer can buy
function displayTable() {
    var displaySelection = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products";
    connection.query(displaySelection, function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            table.push([res[i].item_id,res[i].product_name,res[i].department_name,res[i].price,res[i].stock_quantity])
        }
        console.log(table.toString());
        whatToBuy(res);
    })
};


//ask user what they want to buy
function whatToBuy(inventory) {
    inquirer
        .prompt([
            {
                name: "buy",
                type: "input",
                message: "What is the ID of the item you would like to buy?",
                validate: function (value) {
                    // return((value >= 0 ) && (value < inventory.length));
                    return ((value >= 0) && (value <= inventory.length));
                }
            },
            {
                name: "amount",
                type: "input",
                message: "How much of the item you would like to buy?",
                validate: function (value) {
                    return (value > 0)
                }
            }
        ])
        .then(function (answer) {
            if (answer.buy >= 0 && answer.buy < inventory.length) {
                //check if enough in stock
                if (inventory[answer.buy -1].stock_quantity >= answer.amount) {
                    var leftOver = inventory[answer.buy -1].stock_quantity - answer.amount;
                    // console.log("leftover: ",leftOver)
                    totalCost = answer.amount * inventory[answer.buy -1].price;
                    var queryBamazon = "UPDATE products SET ? WHERE ?"
                    // console.log(queryBamazon);
                    connection.query(queryBamazon, [{ stock_quantity: leftOver }, { item_id: answer.buy  }], function (err, res) {
                        if (err) throw err;
                        console.log("Your total cost is $" + parseFloat(totalCost).toFixed(2));
                        connection.end();
                    })
                } else {
                    console.log("Sorry! We only have " + inventory[answer.buy -1].stock_quantity + " in stock");
                    // displayTable();
                }

            }
        });
};
