//packages and database
const inquirer = require("inquirer") ;
const mysql = require("mysql");
const  table = require("cli-table");

//connections to mysql database and
const connection = mysql.createConnection( {
    host: "localhost",
    port: 3500,
    user: "root",
    password:"root"
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("connected as id " + connection.threadId + "\n");

    readProducts();
});

//function to display data into table in the terminal
function readProducts() {
    console.log("Selecting everything from table into table within the terminal...\n");
    connection.query("SELECT * FROM products", function(err,res) {
        if(err) throw err;
        console.log(res);
        connection.end();
    });
}