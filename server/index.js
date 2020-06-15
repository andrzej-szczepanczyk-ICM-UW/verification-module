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
    .collection("IMGW")
    .aggregate([
      {
        $match: {
          row: Number(row),
          col: Number(col),
        },
      },
      {
        $project: {
          date_imgw_str: {
            $dateToString: {
              date: "$date_imgw",
            },
          },
          value_imgw: 1,
        },
      },
    ])
    .toArray((err, results) => {
      results.forEach((result) => {
        const key = `${result.date_imgw_str.substr(0, 13)}`;
        console.log("IMGW key: ", key);
        console.log("IMGW record: ", result);

        imgw.set(key, result);
      });
    });
}

app.get("/api/mongodata/filterbyforecast", async (req, res) => {
  //FIX - eliminate problem with data translations -> "+ vanish"
  const { row, col, start_forecast } = req.query;
  console.log(row, col, start_forecast, ",");

  fetchImgw(row, col);

  await imgwPromise;

  console.log(imgw);

  //for time measure purposes
  const startDate = new Date();

  dbo
    .collection("UM")
    .aggregate([
      {
        $match: {
          row: Number(row),
          col: Number(col),
          start_forecast: new Date("2019-12-30T01:00:00+01:00"), //start_forecast ? ISODate(start_forecast) : undefined,
        },
      },
      {
        $project: {
          date_um_str: {
            $dateToString: {
              date: "$date_um",
            },
          },
          value_um: 1,
        },
      },
    ])
    .toArray((err, result) => {
      console.log("UM query result is: ", result);

      const endDate = new Date();
      if (err) {
        console.log("time", +endDate - +startDate);
        res.send(err);
        throw err;
      }
      console.log(JSON.stringify(result));
      console.log("time", +endDate - +startDate);
      res.send(
        result.map((value) => {
          const key = `${value.date_um_str}`;
          console.log("UM: key is: ", key);
          console.log("getkeyproduct is ", imgw.get(key.substr(0, 13)));
          console.log("valueproduct is ", value);
          const object = {
            ...imgw.get(key.substr(0, 13)),
            ...value,
          };

          const { value_imgw, date_imgw_str, value_um, date_um_str } = object;
          return {
            value_imgw,
            date_imgw_str,
            date_um_str,
            value_um,
          };
        })
      );
    });
});

app.get("/api/mongodata/filterbydate", async (req, res) => {
  //FIX - eliminate problem with data translations -> "+ vanish"
  const { row, col, start_forecast } = req.query;
  console.log(row, col, start_forecast, ",");

  fetchImgw(row, col);

  await imgwPromise;

  console.log(imgw);

  //for time measure purposes
  const startDate = new Date();

  dbo
    .collection("UM")
    .aggregate([
      {
        $match: {
          row: Number(row),
          col: Number(col),
          date_um: {
            $gt: new Date("2019-12-28T04:00:00+01:00"),
            $lt: new Date("2019-12-30T04:00:00+01:00"),
          },
        },
      },
      {
        $project: {
          date_um_str: {
            $dateToString: {
              date: "$date_um",
            },
          },
          value_um: 1,
          date_um: 1,
        },
      },
    ])
    .toArray((err, result) => {
      console.log("UM query result is: ", result);

      const endDate = new Date();
      if (err) {
        console.log("time", +endDate - +startDate);
        res.send(err);
        throw err;
      }
      console.log(JSON.stringify(result));
      console.log("time", +endDate - +startDate);
      res.send(
        result.map((value) => {
          const key = `${value.date_um_str}`;
          console.log("UM: key is: ", key);
          console.log("getkeyproduct is ", imgw.get(key.substr(0, 13)));
          console.log("valueproduct is ", value);
          const object = {
            ...imgw.get(key.substr(0, 13)),
            ...value,
          };

          const { value_imgw, date_imgw_str, value_um, date_um_str } = object;
          return {
            value_imgw,
            date_imgw_str,
            date_um_str,
            value_um,
          };
        })
      );
    });
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
