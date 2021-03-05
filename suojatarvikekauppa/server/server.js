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
    console.log("Example app listening at http://%s:%s", host, port)
 })
//const server = http.createServer((req, res) => {
  //res.statusCode = 200;
  //res.setHeader('Content-Type', 'text/plain');
  //res.end('The server side of modern webstore');
//});

//server.listen(port, hostname, () => {
  //console.log(`Server running at http://${hostname}:${port}/`);
//});

var con = mysql.createConnection({
  host: "mysql.labranet.jamk.fi",
  user: "AA8660",
  password: "JsozR5mq7k79pwuD5gW10nk8kGYetmmF",
  database: "AA8660"
});
app.use(cors({origin: '*'}));
app.get('/listUsers', function (req, res) {
    if (connected == false) {
      con.connect()
      connected = true;
    }
        //if (err) throw err;
        con.query("SELECT * FROM customers", function (err, result, fields) {
          //if (err) throw err;
          console.log(result);
          res.send({ result })
        });
      
 })
