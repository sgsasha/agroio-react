import React from 'react';
import PropTypes from 'prop-types';
import Chart from "react-apexcharts";


const LineChartWidget = (props) => {
  const state = {
    series: [{
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100]
    }],
    options: {
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
    },
  };

  return (
    <div>
      <Chart
        options={state.options}
        series={state.series}
        type="area"
        height="250px"
      />
    </div>
  );
};

LineChartWidget.propTypes = {};

LineChartWidget.defaultProps = {};

export default LineChartWidget;
