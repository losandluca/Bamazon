//packages and database
const inquirer = require("inquirer");
const mysql = require("mysql");
const table = require("cli-table");

//connections to mysql database and
const connection = mysql.createConnection({
    host: "localhost",
    port: 3500,
    user: "root",
    password: "root"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");

    readProducts();
});

//function to display data into table in the terminal
function readProducts() {
    console.log("Selecting data into table within the terminal...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        //npm cli-table 
        const dataTable = new Table({
            head: ["Item ID", "Product Name", "Department", "Price", "Quantity"],
            colWidths: [10, 25, 10, 10]
        });
        for (let i = 0; i < res.length; i++) {
            dataTable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quanity]
            );
        }
        console.log(table.toString());
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
        .then(answers => {
            const requestID = answers.ID;
            const quantityNeeded = answers.quantityNeeded;
            purchaseOrder(requestID, quantityNeeded);
        });
};

function purchaseOrder(ID, amtNeeded){
	connection.query('Select * FROM products WHERE item_id = ' + ID, function(err,res){
		if(err){console.log(err)};
		if(amtNeeded <= res[0].stock_quantity){
			var totalCost = res[0].price * amtNeeded;
			console.log("Good news your order is in stock!");
			console.log("Your total cost for " + amtNeeded + " " +res[0].product_name + " is " + totalCost + " Thank you!");

			connection.query("UPDATE products SET stock_quantity = stock_quantity - " + amtNeeded + "WHERE item_id = " + ID);
		} else{
			console.log("Insufficient quantity, sorry we do not have enough " + res[0].product_name + "to complete your order.");
		};
		readProducts();
	});
};

readProducts(); 