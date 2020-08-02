import React from "react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Taucharts from "taucharts";
import { computeEffectiveness } from "../../utils/statistics";

let defaultData = new Taucharts.Chart({
  type: "bar",
  data: [{ status: 0, num: 0 }],
  x: "status",
  y: "num",
  color: "status",
  plugins: [
    Taucharts.api.plugins.get("tooltip"),
    Taucharts.api.plugins.get("legend"),
  ],
});

let mockUmimgw = [
  /* 1 */
  {
    value_imgw: 2.685,
    value_um: 2.975,
    date_imgw_str: "2019-04-15T06:00:00.000Z",
    forecast_duration: 6,
    category: "forecast",
  },

  /* 2 */
  {
    value_imgw: 5.867,
    value_um: 5.35,
    date_imgw_str: "2019-04-15T07:00:00.000Z",
    forecast_duration: 7,
    category: "forecast",
  },

  /* 3 */
  {
    value_imgw: 7.468,
    value_um: 7.35,
    date_imgw_str: "2019-04-15T08:00:00.000Z",
    forecast_duration: 8,
    category: "forecast",
  },

  /* 4 */
  {
    value_imgw: 9.291,
    value_um: 8.35,
    date_imgw_str: "2019-04-15T09:00:00.000Z",
    forecast_duration: 9,
    category: "forecast",
  },

  /* 5 */
  {
    value_imgw: 10.286,
    value_um: 8.6,
    date_imgw_str: "2019-04-15T10:00:00.000Z",
    forecast_duration: 10,
    category: "forecast",
  },

  /* 6 */
  {
    value_imgw: 10.787,
    value_um: 8.975,
    date_imgw_str: "2019-04-15T11:00:00.000Z",
    forecast_duration: 11,
    category: "forecast",
  },
];

export function Effectiveness(props) {
  const ref = useRef();
  const [state, setState] = React.useState(defaultData);

  const { historical_data, forecast_data } = useSelector(
    (state) => state.table
  );

  useEffect(() => {
    let data = computeEffectiveness(mockUmimgw);

    //console.log("DATA ARE: !!!!", data);

    setState((state) => ({
      ...state,
      data,
    }));
  }, [historical_data, forecast_data]);

  useEffect(() => {
    console.log("CharEffectiveness: state is", state);
    const chart = new Taucharts.Chart(state);
    chart.renderTo(ref.current);
    return () => {
      chart.destroy();
    };
  }, [state]);

  return (
    <>
      <div>Effectiveness</div>
      <div ref={ref}></div>
    </>
  );
}
