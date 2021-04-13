// Load required modules
var mysql = require('mysql');
var express = require('express');
var cookie_parser = require('cookie-parser');
var cors = require('cors');
var crypto = require('crypto');
var app = express();
const http = require('http');
//const { callbackify } = require('util');
var connected = false;

// Server listens port 5000 by default
var server = app.listen(5000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Node server is listening for requests...", host, port)
 })
// Connect to MySQL database
var con = mysql.createConnection({
  host: "suojatarvikekauppa.mysql.database.azure.com",
  user: "nodeserver@suojatarvikekauppa",
  password: "Sala8999",
  database: "suojatarvikekauppa",
  port: 3306
});
// Activate cookie_parser for signed cookies (needed for authentication)
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
// listProducts API method for fetching product information from database
app.get('/listProducts', function (req, res) {
    if (connected == false) {
      con.connect()
      connected = true;
    }
        //if (err) throw err;
        con.query("SELECT * FROM Products", function (err, result, fields) {
          //if (err) throw err;
          console.log(result);
          res.send({ result })
        });
      
 })
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));
 // placeOrder API method for storing order information to database (under development)
 app.post('/placeOrder', function (req, res) {
  var createOrder = {
    FirstName: req.body.firstname,
    LastName: req.body.lastname,
    Address: req.body.address,
    Zip: req.body.zip,
    City: req.body.city,
    Phone: req.body.phone,
    Email: req.body.email,
    ProductInfoJSON: req.body.orderInfo
   }
   console.log(createOrder);
   con.query("INSERT INTO Orders SET ?", createOrder, function (err, response) {
     if (!err) {
      res.send("Order successfully placed");
     }
   });
 });
 // Function for hashing password using SHA-256
 function hashPassword(password_input) {
  return crypto.createHash("sha256").update(password_input).digest("hex");
}
// registerAccount API method for creating an account and storing information to database
 app.post('/registerAccount', function (req, res) {
  var createAccount = {
    FirstName: req.body.firstname,
    LastName: req.body.lastname,
    Address: req.body.address,
    Email: req.body.email,
    Phone: req.body.phone,
    Password: req.body.password
   }
   createAccount.Password = hashPassword(createAccount.Password);
   console.log(createAccount);
   con.query("INSERT INTO Customers SET ?", createAccount, function (err, response) {
     res.send("Account successfully created!");
   });
 });
 // login API method for logging in to existing account
 app.post('/login', function(req, res) {
  var loginCredentials = {
    Email: req.body.email,
    Password: req.body.password,
  }
  loginCredentials.Password = hashPassword(loginCredentials.Password);
  console.log(loginCredentials);
  CheckPassword(loginCredentials, returnResult);
  // Function used by login API method to fetch password hash by email address from database
  function CheckPassword(loginCredentials, callback) {
    con.query("SELECT Password FROM Customers WHERE Email =?", loginCredentials.Email, function(err, result) {
      if (!err) {
        callback(false, result);
      } else {
        callback(true, err);
      }
    })
  }
  // Function for returning the login result
  // if login is successful, redirect user to front page
  function returnResult(error, result) {
    if (error) {
      res.send(`Database error: ${result}`);
    } else {
      if (result.length > 0 && loginCredentials.Password == result[0].Password) {
        res.setHeader('user', loginCredentials.Email);
        res.redirect("http://localhost:3000/");
      } else {
        res.send("Login failed: incorrect email or password");
      }
    }
  }
});
app.get('/getCustomerInfo', function (req, res) {
  //var username = req.signedCookies.user;
  console.log(JSON.stringify(req.headers.user));
  if (false) {
    res.send('You are not logged in. Log in to place the order');
  } else {
    con.query("SELECT FirstName, LastName, Address, Email, Phone FROM Customers WHERE Email =?", username, function(err, result) {
      if (!err) {
        console.log(result);
        res.send(result);
      } else {
        console.log(err);
      }
    });
  }
});
