import "./DevicesPage.css";
import React, { useEffect, useRef, useState } from 'react';
import { getDevices } from "../../store/actions";
import { useSelector } from "react-redux";
import { history } from "../../helpers/history";
import TablePagination from '@material-ui/core/TablePagination';
import Table from 'react-bootstrap/Table';
import Badge from "react-bootstrap/Badge";

const DevicesPage = () => {
  const isInitialMount = useRef(true);
  const devices = useSelector(state => state.devicesReducer.devices);
  const total = useSelector(state => state.devicesReducer.total);
  const [state, setState] = useState({
    page: 0,
    rowsPerPage: 10
  });
  /**
   * This is kinda created() lifecycle hook.
   */
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      getDevices(state.page, state.rowsPerPage);
    }
  });

  function handleChangePage (event) {
    setState({
      ...state,
      page: event.target.value,
    });
    getDevices(state.page, state.rowsPerPage);
  }

  function handleChangeRowsPerPage (event) {
    setState({
      ...state,
      rowsPerPage: event.target.value,
    });
    getDevices(state.page, state.rowsPerPage);
  }

  function getStatusChip (isOnline) {
    if (isOnline) {
      return (
        <Badge pill variant="success">
          Online
        </Badge>
      )
    }
    return (
      <Badge pill variant="danger">
        Offline
      </Badge>
    )
  }

  function navigateToDevice (deviceId) {
    history.push(`/device/${deviceId}`)
  }

  return (
    <div className="devices-page">
      <div className="devices-page__table ">
        <Table hover className="table-borderless">
          <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Status</th>
            <th>Moisture</th>
            <th>Water level</th>
          </tr>
          </thead>
          <tbody>
          {devices.map(device => {
            return (
              <tr key={device.deviceId} onClick={navigateToDevice.bind(this, device.deviceId)}>
                <td>{device.deviceId}</td>
                <td>{device.user}</td>
                <td>{getStatusChip(device.isOnline)}</td>
                <td>{device.moisture}</td>
                <td>{device.waterLevel}</td>
              </tr>
            )
          })}
          </tbody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={total}
          rowsPerPage={state.rowsPerPage}
          page={state.page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

DevicesPage.propTypes = {};

DevicesPage.defaultProps = {};

export default DevicesPage;
