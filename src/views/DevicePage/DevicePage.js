import React, {useEffect, useRef} from 'react';
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { getDevice, getDeviceMoisture } from "../../store/actions";
import {useSelector} from "react-redux";
import Chart from "react-apexcharts";


const DevicePage = () => {
  const { id } = useParams();
  const isInitialMount = useRef(true);
  const device = useSelector(state => state.deviceReducer.device);
  const moisture = useSelector(state => state.deviceReducer.moisture);
  const state = {
    series: [{
      name: 'series1',
      data: moisture.map(d => d.moisture.toFixed(0))
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
        categories: moisture.map(d => d._id)
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
    },
  };

  /**
   * This is kinda created() lifecycle hook.
   */
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      getDevice(id);
      getDeviceMoisture(id);
    }
  });
  return (
    <div className="m-5">
    <Card>
      <Card.Body>
        <div className="row">
          <div className="col-4">
            <div>
              <b>Device Id</b>: {device.deviceId}
            </div>
            <div>
              <b>Moisture</b>: {device.moisture}
            </div>
            <div>
              <b>Water level</b>: {device.waterLevel}
            </div>
            <div>
              <b>Status</b>: {device.isOnline ? "Online": "Offline"}
            </div>
          </div>
          <div className="col-8">
            <Chart
              options={state.options}
              series={state.series}
              type="area"
              height="250px"
            />
          </div>
        </div>
      </Card.Body>
    </Card>
    </div>
  );
};

DevicePage.propTypes = {};

DevicePage.defaultProps = {};

export default DevicePage;
