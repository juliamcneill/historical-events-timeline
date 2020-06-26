const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + "/../client/dist"));

module.exports.app = app;
app.set("port", 3030);

if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}
