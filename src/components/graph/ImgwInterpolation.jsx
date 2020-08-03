import React from "react";

let stations = [
  { row: 266, col: 161, stationName: "KOLOBRZEG" },
  { row: 266, col: 170, stationName: "KOSZALIN" },
  { row: 276, col: 182, stationName: "USTKA" },
];

let node2str = (node) => {
  return JSON.stringify(node);
};

let updateGraph = (currentStationData, newStationData) => {
  return currentStationData;
};

export function ImgwInterpolation() {
  return (
    <div>
      <div>Imgw Interpolation Module</div>{" "}
      <ul>
        {stations.map((station) => (
          <li>{node2str(station)}</li>
        ))}
      </ul>
    </div>
  );
}
