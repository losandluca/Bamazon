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
        for(let i = 0; i <res.length; i++) {
            dataTable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quanity]
            );

            console.log(table.toString());
        }
    });
}