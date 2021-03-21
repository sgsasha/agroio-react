import React from 'react';
import PropTypes from 'prop-types';
import Chart from "react-apexcharts";

// TODO: complete getting data from back-end
const DonutChartWidget = (props) => {
  const state = {
    options: {
      legend: {
        show: false
      }
    },
    series: [20, 80],
  };

  return (
    <div>
      <Chart
        options={state.options}
        series={state.series}
        type="donut"
        height="250px"
      />
    </div>
  );
}

DonutChartWidget.propTypes = {};

DonutChartWidget.defaultProps = {};

export default DonutChartWidget;
