const http = require('http');

const hostname = '127.0.0.1';
const port = 5000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('The server side of modern webstore');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "mysql.labranet.jamk.fi",
  user: "AA8660",
  password: "JsozR5mq7k79pwuD5gW10nk8kGYetmmF",
  database: "AA8660"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM customers", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});