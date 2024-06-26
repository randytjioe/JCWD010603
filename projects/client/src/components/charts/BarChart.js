import React, { Component } from "react";
import Chart from "react-apexcharts";

export default function ColumnChart(props) {
  return (
    <Chart
      options={props.chartOptions}
      series={props.chartData}
      type="bar"
      width={props.w}
      height={props.h}
    />
  );
}

// class ColumnChart extends Component {
//   constructor(props) {
//     console.log("asd");
//     console.log(props);

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
//       <Chart
//         options={this.state.chartOptions}
//         series={this.state.chartData}
//         type="bar"
//         width="100%"
//         height="100%"
//       />
//     );
//   }
// }

// export default ColumnChart;
