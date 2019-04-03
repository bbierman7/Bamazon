var mysql = require("mysql");
var inquirer = require("inquirer");

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
    whatToBuy();
});


//==========================================================================
//ask user what they want to buy
function whatToBuy(){
    inquirer
    .prompt([
        {
        name: "buy",
        type: "input",
        message: "What is the ID of the item you would like to buy?"
        },
        {
            name: "amount",
            type: "input",
            message: "How much of the item you would like to buy?"
        }
    ])
    .then(function(answer){
        var queryBamazon = "SELECT * FROM products WHERE id = ?";
        connection.query(queryBamazon, answer.buy, function (err, res) {
            if (err) throw err;
            if(!res.length){
                console.log("Sorry, you picked an item which is not in our inventory. Please try again");
            whatToBuy();
            }
        }) 
            
        
    })
}