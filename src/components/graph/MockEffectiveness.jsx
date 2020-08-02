import React from "react";
import { useSelector } from "react-redux";
// import Taucharts from "taucharts";
// import { computeEffectiveness } from "../../utils/statistics";

// let defaultData = new Taucharts.Chart({
//   type: "bar",
//   data: [{ status: 0, num: 0 }],
//   x: "status",
//   y: "num",
//   color: "status",
//   plugins: [
//     Taucharts.api.plugins.get("tooltip"),
//     Taucharts.api.plugins.get("legend"),
//   ],
// });

export function MockEffectiveness() {
  var handleComputeStatisticals = () => {
    document
      .getElementById("mymockEffectivenesstextarea")
      .innerHTML(JSON.stringify(UmImgwPair.historical_data, null, 2));
  };

  var UmImgwPair = useSelector((state) => state.UmImgwPair);

  return (
    <>
      <div>MockEffectiveness</div>
      <textarea id="mymockEffectivenesstextarea">
        {JSON.stringify(UmImgwPair.historical_data, null, 2)}
      </textarea>
      <button onClick={handleComputeStatisticals}>Run!</button>
    </>
  );
}
