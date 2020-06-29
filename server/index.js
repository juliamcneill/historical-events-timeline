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

var readBySearchTermAndLimit = (
  searchTerm,
  category,
  eventsLoaded,
  eventsIncrement,
  callback
) => {
  connection.query(
    `SELECT * FROM events WHERE (date LIKE '%` +
      `${searchTerm}` +
      `%' OR description LIKE '%` +
      `${searchTerm}` +
      `%' OR category1 LIKE '%` +
      `${searchTerm}` +
      `%' OR category2 LIKE '%` +
      `${searchTerm}` +
      `%') AND (category1 LIKE '%` +
      `${category}` +
      `%' OR category2 LIKE '%` +
      `${category}` +
      `%') ORDER BY id LIMIT ${eventsLoaded}, ${eventsIncrement}`,
    function (error, results) {
      callback(error, results);
    }
  );
};

var editEvent = (newEventInformation, callback) => {
  connection.query(
    `UPDATE events SET date='${newEventInformation.newDate}', description='${newEventInformation.newDescription}' WHERE id=${newEventInformation.id}`,
    function (error, results) {
      callback(error, results);
    }
  );
};

var getTopics = (callback) => {
  connection.query(
    `SELECT DISTINCT category2 FROM events WHERE category1 LIKE '%By topic%' ORDER BY category2`,
    function (error, results) {
      callback(error, results);
    }
  );
};

var getPlaces = (callback) => {
  connection.query(
    `SELECT DISTINCT category2 FROM events WHERE category1 LIKE '%By place%' ORDER BY category2`,
    function (error, results) {
      callback(error, results);
    }
  );
};

app.get("/events", (req, res) => {
  readBySearchTermAndLimit(
    req.query.searchTerm,
    req.query.category,
    req.query.eventsLoaded,
    req.query.eventsIncrement,
    function (error, results) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.put("/events", (req, res) => {
  editEvent(req.body, function (error, results) {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.get("/topics", (req, res) => {
  getTopics(function (error, results) {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.status(200).json(results);
    }
  });
});

app.get("/places", (req, res) => {
  getPlaces(function (error, results) {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.status(200).json(results);
    }
  });
});
