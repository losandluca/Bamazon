//packages and database
const inquirer = require("inquirer") ;
const mysql = require("mysql");
const  table = require("cli-table");

const connection = mysql.createConnection( {
    host: "localhost",
    port: 3500,
    user: "root",
    password:"root"
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
})