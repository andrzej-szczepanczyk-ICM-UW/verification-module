const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const cors = require("cors");
const mongodb = require("mongodb");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

let db = null;
mongodb.connect(process.env.MONGO_DB).then((database) => {
  db = database.db("verificationservice");
});

app.get("/", (req, res) => {
  db.collection("UMIMGW")
    .find({})
    .toArray()
    .then((data) => {
      console.log(JSON.stringify(data).length / 1024 / 1024, "MB");
      return data;
    })
    .then((data) => {
      const { from, to } = req.query;
      const fromDate = +new Date(from);
      const toDate = +new Date(to);

      const filteredData = {};
      data.forEach((object) => {
        if (
          (!to || +object.date <= toDate) &&
          (!from || +object.date >= fromDate)
        ) {
          filteredData[+object.date] = object;
        }
      });

      return filteredData;
    })
    .then((filtered) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(filtered));
    });
});

app.listen(3003, () =>
  console.log("Express server is running on localhost:3003")
);
