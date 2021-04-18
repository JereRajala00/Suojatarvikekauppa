// Load required modules
var mysql = require('mysql');
var express = require('express');
var cookie_parser = require('cookie-parser');
var cors = require('cors');
var crypto = require('crypto');
var aesjs = require('aes-js');
var app = express();
const http = require('http');
var bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { resolve } = require('path');
const { useState } = require('react');
var connected = false;

dotenv.config();
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
 var customerInfo;
 var orderInfo;
 var finalInfo;
 app.post('/placeOrder', async function (req, res) {
  orderInfo = req.body.orderInfo;
  var username = decryptAccessToken(req.body.AuthToken);
  var firstQuery = await prepareOrder(username);
  con.query("INSERT INTO Orders SET ?", finalInfo, function (err, response) {
      if (!err) {
          console.log("Order successfully placed");
          res.send({status:200,message:"Kiitos tilauksesta!"});
      } else {
          console.log(err);
          res.send({status:500,message:"Tilauksen tallentaminen epäonnistui."});
      }
  });
});
// Function for fetching customer info from database for internal use
function prepareOrder(username) {
  return new Promise((resolve, reject) => {
      con.query("SELECT FirstName, LastName, Address, Zip, City, Email, Phone FROM Customers WHERE Email=?", username, function (err, response) {
          resolve(response);
      })
  }).then(resolve => setCustomerInfo(resolve))
}
// Function for preparing data to be inserted to database
function setCustomerInfo(info) {
  customerInfo = JSON.stringify(info);
  customerInfo = JSON.parse(customerInfo);
  orderInfo = JSON.parse(orderInfo);
  finalInfo = {
    FirstName: customerInfo[0].FirstName,
    LastName: customerInfo[0].LastName,
    Address: customerInfo[0].Address,
    Zip: customerInfo[0].Zip,
    City: customerInfo[0].City,
    Email: customerInfo[0].Email,
    Phone: customerInfo[0].Phone,
    ProductInfoJSON: JSON.stringify(orderInfo)
  }
  console.log(finalInfo);
}
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
    Zip: req.body.zip,
    City: req.body.city,
    Email: req.body.email,
    Phone: req.body.phone,
    Password: req.body.password
   }
   createAccount.Password = hashPassword(createAccount.Password);
   console.log(createAccount);
   con.query("INSERT INTO Customers SET ?", createAccount, function (err, response) {
     if (err) {
      res.send({status:500,message:"Käyttäjätilin rekisteröinti epäonnistui."});
     }
    res.send({status:200,message:"Käyttäjätili rekisteröity onnistuneesti."});
   });
 });
 // login API method for logging in to existing account
 app.post('/login', function(req, res) {
  var loginCredentials = {
    Email: req.body.email,
    Password: req.body.password
  }
  loginCredentials.Password = hashPassword(loginCredentials.Password);
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
        const token = generateAccessToken(loginCredentials.Email);
        res.send({status:200,token:token, message: "Kirjautuminen onnistui, tervetuloa!"});
      } else {
        res.send({status:500, message: "Kirjautuminen epäonnistui: väärä käyttäjätunnus tai salasana"});
      }
    }
  }
});
function generateAccessToken(username) {
  var key = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  var textBytes = aesjs.utils.utf8.toBytes(username);
  var aesCtr = new aesjs.ModeOfOperation.ctr(key);
  var encryptedBytes = aesCtr.encrypt(textBytes);
  var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  return encryptedHex;
}
function decryptAccessToken(token) {
  var key = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  var encryptedBytes = aesjs.utils.hex.toBytes(token);
  var aesCtr = new aesjs.ModeOfOperation.ctr(key);
  var decryptedBytes = aesCtr.decrypt(encryptedBytes);
  var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  return decryptedText;
}
app.post('/getCustomerInfo', function (req, res) {

  var username = decryptAccessToken(req.body.AuthToken);
  console.log(username);
  if (username.length < 5) {
    res.send('You are not logged in. Log in to place the order');
  } else {
    con.query("SELECT FirstName, LastName, Address, Zip, City, Email, Phone FROM Customers WHERE Email =?", username, function(err, result) {
      if (!err) {
        console.log(result);
        res.send(result);
      } else {
        console.log(err);
      }
    });
  }
});
app.post('/admin', function (req, res) {
  if (req.body.AuthToken != undefined) {
    if (decryptAccessToken(req.body.AuthToken) == "admin@jamk.fi") {
      con.query("SELECT * FROM Orders", function(err, result) {
        res.send(result);
      })
    } else {
      res.send({status:403,message:"Sinulla ei ole järjestelmänvalvojan oikeuksia"});
    }
  } else {
    res.send({status:403,message:"Et ole kirjautunut sisään."});
  }
})
