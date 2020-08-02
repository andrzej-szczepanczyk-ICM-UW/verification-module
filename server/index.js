/* eslint-disable */
const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const cors = require("cors");
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://127.0.0.1:27017/";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

let dbo = null;
let imgwPromise = null;
let imgw = new Map();

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  dbo = db.db("verificationservice");
});

function fetchImgw(row, col) {
  imgwPromise = dbo
    .collection("IMGWraw")
    .aggregate([
      {
        $match: {
          row: Number(row),
          col: Number(col),
        },
      },
    ])
    .toArray((err, results) => {
      results.forEach((result) => {
        const key = `${result.date_imgw}`;

        imgw.set(key, result);
      });
    });
}

//http://localhost:3001/api/mongodata/filter?way=forecast&row=210&col=271&firstDate=2019-01-01T00:00:00.000Z&lastDate=2019-01-03T00:00:00.000Z
app.get("/api/mongodata/filter", async (req, res) => {
  fetchImgw(req.query.row, req.query.col);

  await imgwPromise;

  let match_filter = 0;

  if (req.query.way === "forecast") {
    match_filter = {
      row: Number(req.query.row),
      col: Number(req.query.col),
      start_forecast: {
        $gte: new Date(req.query.firstDate),
        $lte: new Date(req.query.lastDate),
      },
    };
  }

  if (req.query.way === "oneforecast") {
    match_filter = {
      row: Number(req.query.row),
      col: Number(req.query.col),
      start_forecast: new Date(req.query.forecastDate),
    };
  }

  dbo
    .collection("UM")
    .aggregate([
      {
        $match: match_filter,
      },
    ])
    .toArray((err, result) => {
      if (err) {
        res.send(err);
        throw err;
      }

      res.send(
        result.map((value) => {
          const key = `${value.date_um}`;

          const object = {
            ...imgw.get(key),
            ...value,
          };

          const { start_forecast, date_um } = object;

          let date_um_str = JSON.stringify(date_um);
          let start_forecast_str = JSON.stringify(start_forecast);
          debugger;
          return {
            //date_um_str,
            // start_forecast_str,
            // value_um,
            // value_imgw,
            ...object,
            date_um_str,
            start_forecast_str,
          };
        })
      );
    });
});

app.get("/api/mongodata/listnodes/imgwraw", async (req, res) => {
  console.log("I am in load nodes section");
  dbo
    .collection("IMGWraw")
    .aggregate([{ $project: { row: 1, col: 1, _id: 0 } }])
    .toArray((err, result) => {
      let rowcolMap = new Map();
      result.map((point) => {
        rowcolMap.set(10000 * point.row + point.col, point);
      });
      res.send([...rowcolMap.values()]);
    });
});

app.get("/api/mongodata/listnodes/um", async (req, res) => {
  console.log("I am in load nodes section");
  dbo
    .collection("UM")
    .aggregate([{ $project: { row: 1, col: 1, _id: 0 } }])
    .toArray((err, result) => {
      let rowcolMap = new Map();
      result.map((point) => {
        rowcolMap.set(10000 * point.row + point.col, point);
      });
      res.send([...rowcolMap.values()]);
    });
});

//TODO for statistical parameters make here
app.get("/um/inspection", async (req, res) => {
  console.log("I am in um/inspection for statistical verification ");
  res.send("Tutaj odbywa się weryfikacja danych pogodowych.");
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
