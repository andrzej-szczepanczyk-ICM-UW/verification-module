const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const cors = require("cors");
const mongodb = require("mongodb");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(pino);

let db = null;
mongodb.connect(process.env.MONGO_DB).then((database) => {
  db = database.db("verification_service");
});

app.get("/api/mongodata", async (req, res) => {
  const filters = {};
  const { row, col, firstDate, lastDate } = req.query;
  if (row) {
    filters["row"] = Number(row);
  }

  if (col) {
    filters["col"] = Number(col);
  }

  const dateRange = {};
  if (firstDate) {
    dateRange["$gte"] = new Date(firstDate);
  }

  if (lastDate) {
    dateRange["$lte"] = new Date(lastDate);
  }

  if (Object.keys(dateRange).length > 0) {
    filters.date = dateRange;
  }

  const data = await db
    .collection("UM")
    //rozszerzyć i rozwinąć tutaj filtrowanie danych
    .find(filters)
    .toArray();

  res.send(JSON.stringify(data));
});

app.listen(3003, () =>
  console.log("Express server is running on localhost:3003")
);
