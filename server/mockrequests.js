const m1 = [
  {
    $match: {
      $or: [
        {
          date_um: {
            $gte: new Date(2018, 3, 3, 0),
            $lte: new Date(2018, 4, 5, 2),
          },
          row: 211,
          col: 233,
        },
        {
          date_um: {
            $gte: new Date(2019, 3, 3, 0),
            $lte: new Date(2019, 4, 5, 2),
          },
          row: 211,
          col: 233,
        },
      ],
    },
  },
  //preparing data for Taucharts Visualisation
  {
    $project: {
      start_forecast_str: {
        $dateToString: {
          date: "$start_forecast",
        },
      },
      date_um_str: {
        $dateToString: {
          date: "$date_um",
        },
      },
      category: {
        $year: "$date_um",
      },
      value_um: 1,
      _id: 0,
    },
  },
];

const m2 = [
  {
    $match: {
      row: 175,
      col: 162,
      start_forecast: new Date(2018, 2, 1, 1),
    },
  },
  {
    $lookup: {
      from: "IMGW",
      localField: "date_um",
      foreignField: "date_imgw",
      as: "join",
    },
  },
  {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: [
          {
            $arrayElemAt: ["$join", 0],
          },
          "$$ROOT",
        ],
      },
    },
  },
  {
    $project: { join: 0, date_um: 0, stations: 0 },
  },
  {
    $project: { row: 0, col: 0, start_forecast: 0 },
  },
];

module.exports = {
  m1,
  m2,
};
