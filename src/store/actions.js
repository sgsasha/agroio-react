import { axiosInstance } from "./../helpers/axios";
import { store } from "./store";
import { history } from "./../helpers/history";
import { LOGIN, LOGIN_ERROR, SET_DEVICE, SET_DEVICES, SET_MOISTURE } from "./actionTypes";

export const login = (userInfo)  => {
  const request = {
    url: "https://agroiot.herokuapp.com/auth/login",
    method: "POST",
    data: userInfo
  };
  axiosInstance.request(request)
    .then(res => {
      store.dispatch({ type: LOGIN, payload: { accessToken: res.data.accessToken }});
      localStorage.setItem("agroioToken", res.data.accessToken);
      history.push("/dashboard");
    })
    .catch(() => {
      store.dispatch({ type: LOGIN_ERROR });
      localStorage.removeItem("agroioToken");
    })
};

export const logout = ()  => {
  localStorage.removeItem("agroioToken");
  history.push("/login");
  store.dispatch({type: LOGIN, payload: {accessToken: null}});
};

export const getDevices = (page = 0, pageSize = 10)  => {
  const request = {
    url: "https://agroiot.herokuapp.com/devices/list",
    method: "POST",
    data: {
      paging: {
        page: page,
        pageSize: pageSize,
      },
      filters: {
        deviceId: '',
      },
      sorting: {
        sortBy: 'deviceId',
        sortDesc: false
      }
    }
  };
  axiosInstance.request(request)
    .then(res => {
      store.dispatch({type: SET_DEVICES, payload: {data: res.data.items, total: res.data.total}});
    })
};


export const getDevice = (deviceId)  => {
  const request = {
    url: `https://agroiot.herokuapp.com/devices/${deviceId}`,
    method: "GET"
  };
  axiosInstance.request(request)
    .then(res => {
      console.log(res);
      store.dispatch({type: SET_DEVICE, payload: {data: res.data}});
    })
};

export const getDeviceMoisture = (deviceId)  => {
  const request = {
    url: `https://agroiot.herokuapp.com/moisture/device/${deviceId}`,
    method: "GET"
  };
  axiosInstance.request(request)
    .then(res => {
      console.log(res);
      const moisture = res.data.sort((a, b) => {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return  new Date(a._id).getTime() - new Date(b._id).getTime();
      });
      store.dispatch({type: SET_MOISTURE, payload: {data: moisture}});
    })
};