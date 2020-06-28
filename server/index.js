const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/../client/dist"));

module.exports.app = app;
app.set("port", 3030);

if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "historical_events_timeline",
});

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected!");
  }
});

var readBySearchTermAndLimit = (searchTerm, limitStart, limitEnd, callback) => {
  connection.query(
    `SELECT * FROM events WHERE date LIKE '%` +
      `${searchTerm}` +
      `%' OR description LIKE '%` +
      `${searchTerm}` +
      `%' OR category1 LIKE '%` +
      `${searchTerm}` +
      `%' OR category2 LIKE '%` +
      `${searchTerm}` +
      `%' ORDER BY id LIMIT ${limitStart}, ${limitEnd}`,
    function (error, results) {
      callback(error, results);
    }
  );
};

app.get("/events", (req, res) => {
  readBySearchTermAndLimit(
    req.query.searchTerm,
    req.query.limitStart,
    req.query.limitEnd,
    function (error, results) {
      if (error) {
        res.status(404).json(error);
      } else {
        res.status(200).json(results);
      }
    }
  );
});
