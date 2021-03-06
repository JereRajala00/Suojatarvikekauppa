var mysql = require('mysql');
var express = require('express');
var cors = require('cors');
var app = express();
const http = require('http');
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
        //if (err) throw err;
        con.query("SELECT * FROM Products", function (err, result, fields) {
          //if (err) throw err;
          console.log(result);
          res.send({ result })
        });
      
 })
