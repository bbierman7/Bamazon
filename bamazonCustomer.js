var mysql = require("mysql");
var inquirer = require("inquirer");
var totalCost;
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "adidas87!",
    database: "bamazon_db"
});

//==========================================================================

connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
    // console.log(res);
    // displayTable();
    displayTable();
});

//==========================================================================

//display table of items that customer can buy
function displayTable(){
    var displaySelection = "SELECT product_name, department_name, price, stock_quantity FROM products"; 
    connection.query(displaySelection, function (err, res){
        if (err) throw err;
        console.table(res);
        whatToBuy(res);
    })
};


//ask user what they want to buy
function whatToBuy(inventory){
    inquirer
    .prompt([
        {
            name: "buy",
            type: "input",
            message: "What is the ID of the item you would like to buy?",
            validate: function(value){
                    return((value >= 0 ) && (value < inventory.length));
            }
        },
        {
            name: "amount",
            type: "input",
            message: "How much of the item you would like to buy?",
            validate: function(value){
                return (value > 0)
            }
        }
    ])
    .then(function(answer){
        if(answer.buy >= 0 && answer.buy < inventory.length){
            //check if enough in stock
            if(inventory[answer.buy].stock_quantity >= answer.amount){
                var leftOver = inventory[answer.buy].stock_quantity - answer.amount;
                totalCost = answer.amount * inventory[answer.buy].price;
                var queryBamazon = "UPDATE products SET stock_quantity = " + leftOver + " WHERE item_id = " + (answer.buy + 1);
                connection.query(queryBamazon, function(err, res){
                    if (err) throw err;
                    console.log("Your total cost is, $" + parseFloat(totalCost).toFixed(2));
                    displayTable();
                })
            } else {
                console.log("Insufficient quantity!: " + inventory[answer.buy].stock_quantity);
                displayTable();
            }

        }
    });
};



    //     var queryBamazon = "SELECT * FROM products WHERE item_id = ?";
    //     connection.query(queryBamazon, answer.buy, function (err, res) {
    //         if (err) throw err;

    //         //we don't have that item in stock
    //         if(!res.length){
    //             console.log("Sorry, you picked an item which is not in our inventory. Please try again");
    //             whatToBuy();
    //         };

    //     });
    //     var leftOver = "SELECT stock_quantity FROM products WHERE item_id = ?";
    //     var remaining;
    //     connection.query(leftOver, answer.amount, function (err,res){
    //         if (err) throw err;
    //         if (answer.amount > stock_quantity){
    //             remaining = answer.amount - stock_quantity;
    //             console.log("There are now: " + remaining + "of: " + item_id + "left in inventory");

    //         }
    //     })
    // });
    // };
    
