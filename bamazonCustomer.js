//packages and database
const inquirer = require("inquirer");
const mysql = require("mysql");
const Table = require("cli-table");

//connections to mysql database and
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});

//function to display data into table in the terminal
let readProducts = function () {
    console.log("Selecting data into table within the terminal...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        //npm cli-table 
        let dataTable = new Table({
            head: ["Item ID", "Product Name", "Department", "Price", "Quantity"],
            colWidths: [10, 25, 25, 10,14]
        });
        for (let i = 0; i < res.length; i++) {
            dataTable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quanity]
            );
        }
        console.log(dataTable.toString());
        promptPurchase();
    });
}

//inquirer prompt to display the questions for the user
function promptPurchase() {
    inquirer
        .prompt([{
                type: "input",
                message: "What is the ID of the product you would like to purchase?",
                name: "ID"
            },
            {
                type: "input",
                message: "How many items would you like to purchase?",
                name: "Quantity"
            },
        ])
        .then(function(answers) {
            let requestID = answers.ID;
            let quantityNeeded = answers.Quantity;
            purchaseOrder(requestID, quantityNeeded);
        });
};

function purchaseOrder(ID, amtNeeded){
	connection.query('Select * FROM products WHERE item_id = ' + ID, function(err,res){
		if(err){console.log(err)};
		if(amtNeeded <= res[0].stock_quantity){
			var totalCost = res[0].price * amtNeeded;
            console.log("You're Item is in stock. Let us grab it for you real quick...");
            
			console.log("Your total cost for " + amtNeeded + " " +res[0].product_name + " is " + totalCost + " Thank you");

			connection.query("UPDATE products SET stock_quantity = stock_quantity - " + amtNeeded + "WHERE item_id = " + ID);
		} else{
			console.log("Insufficient quantity, sorry we do not have enough " + res[0].product_name + " to complete your order.");
		};
		readProducts();
	});
};

readProducts(); 