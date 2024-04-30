import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useState } from "react";

const LineChart = (props) => {
  const [chart, setChart] = useState({ chartData: [], chartOptions: {} });
  useEffect(() => {
    setChart({
      chartData: props.chartData,
      chartOptions: props.chartOptions,
    });
  }, []);
  return (
    <ReactApexChart
      options={chart.chartOptions}
      series={chart.chartData}
      type="line"
      width={props.w}
      height={props.h}
    />
  );
};

// class LineChart extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       chartData: [],
//       chartOptions: {},
//     };
//   }

//   componentDidMount() {
//     this.setState({
//       chartData: this.props.chartData,
//       chartOptions: this.props.chartOptions,
//     });
//   }

//   render() {
//     return (
//       <ReactApexChart
//         options={this.state.chartOptions}
//         series={this.state.chartData}
//         type="line"
//         width="100%"
//         height="100%"
//       />
//     );
//   }
// }

export default LineChart;
