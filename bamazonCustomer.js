// CUSTOMER VIEW

// dependencies used
var mysql = require('mysql');
var inquirer = require('inquirer');

// database connection
var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 8889,
    user: "root",
    password: "root",
    database: "Bamazon_DB"
});


console.log("Welcome to Bamazon!");
showProducts();


// function showing all of products
function showProducts() {
    connection.query('SELECT * FROM products', function(error, response) {
        if (error) console.log(error);

        console.log(response);
        purchasePrompt();
    });
}


// function for buying
function purchasePrompt() {
    inquirer.prompt([

        {
            name: "product_id",
            type: "input",
            message: "Please enter the item number of the product you would like to purchase."
        }, {
            name: 'product_quantity',
            type: 'input',
            message: "How many will you be ordering?"
        },

    ]).then(function(answers) {
        var saleQuantity = answers.product_quantity;
        var saleID = answers.product_id;
        purchaseOrder(saleID, saleQuantity);
    });

}

// function for purchasing
function purchaseOrder(id, quantity) {
    connection.query('SELECT * FROM products WHERE item_id = ' + id, function(error, response) {
        if (error) console.log(error);

        //if in stock
        if (quantity <= response[0].stock_quantity) {
            //calculate cost
            var saleTotal = response[0].price * quantity;
            //inform user
            console.log("Order placed!");
            console.log("Total for " + quantity + " " + response[0].product_name + " is $" + saleTotal + ". Pay up!");
            //update database, minus purchased quantity
            connection.query('UPDATE products SET stock_quantity = stock_quantity - ' + quantity + ' WHERE item_id = ' + id);
        } else {
            console.log("Insufficient quantity for " + response[0].product_name + ".");
        }
        // run again? showProducts();
    });

}





// additions/ideas


// prompt
// welcome to Bamazon
// display all of products (only display id name price only)
// Would you like to refine your search?
// if not, then run basic options function
// if yes, run additional options function



// function showing all of products

// function basic options
// prompt
// ask them to enter the id of the product they would like to buy

// function additional options
// list
// ask user to search by 
// price (low to high)
// item id
// product name
// department			


// function showing all of products by price
// prompt
// ask, sort by low to high or high to low
// list
// low to high
// high to low
// list them		


// function showing all items by id

// function showing product names sorted
// prompt
// ask how they would like the products sorted
// list
// by a-z
// by z-a
// list them

// function showing products by department
// prompt
// list
// list of departments to select
// show items only in the specific department selected						


// function for placing an order
// prompt
// then ask how many units of the product they would like to buy
// check if there is enough stock
// place order
// update database
// show purchase total
// if not enough quantity, then display insufficient quantity, and show the quanitity available