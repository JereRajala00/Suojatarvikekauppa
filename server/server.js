var mysql = require('mysql');
var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
const http = require('http');
const { callbackify } = require('util');
var connected = false;
const hostname = '127.0.0.1';
const port = 5000;

var server = app.listen(5000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Node server is listening for requests...", host, port)
 })

var con = mysql.createConnection({
  host: "192.168.8.117",
  user: "tkuser1",
  password: "sala",
  database: "suojatarvikekauppa"
});
app.use(cors({origin: '*'}));
app.get('/listProducts', function (req, res) {
    if (connected == false) {
      con.connect()
      connected = true;
    }
        con.query("SELECT * FROM Products", function (err, result, fields) {
          console.log(result);
          res.send({ result });
        });
      
 })
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));
 app.post('/placeOrder', function (req, res) {
  var createOrder = {
    OrderID: req.body.firstname,
    CustomerID: req.body.lastname,
    // OrderID, CustomerID, ProductID, ProductQuantity, Firstname, Lastname, Address, Zip, City, Country
    ProductID: req.body.address
   }
   console.log(createOrder);
   con.query("INSERT INTO Orders SET ?", createOrder, function (err, response) {
     res.send("Order successfully placed");
   });
 });
 app.post('/registerAccount', function (req, res) {
  var createAccount = {
    FirstName: req.body.firstname,
    LastName: req.body.lastname,
    Address: req.body.address,
    Email: req.body.email,
    Phone: req.body.phone,
    Password: req.body.password
   }
   console.log(createAccount);
   con.query("INSERT INTO Customers SET ?", createAccount, function (err, response) {
     res.send("Account successfully created!");
   });
 });
 app.post('/login', function(req, res) {
  var loginCredentials = {
    Email: req.body.email,
    Password: req.body.password,
  }
  console.log(loginCredentials);
  CheckPassword(loginCredentials, returnResult);

  function CheckPassword(loginCredentials, callback) {
    con.query("SELECT Password FROM Customers WHERE Email =?", loginCredentials.Email, function(err, result) {
      if (!err) {
        callback(false, result);
      } else {
        callback(true, err);
      }
    })
  }

  function returnResult(error, result) {
    if (error) {
      res.send(`Database error: ${result}`);
    } else {
      if (result.length > 0 && loginCredentials.Password == result[0].Password) {
        res.send("Login successfull");
      } else {
        res.send("Login failed: incorrect email or password");
      }
    }
  }
});
