import {SET_DEVICE, SET_MOISTURE} from "../actionTypes";

const initialState = {
  device: {},
  moisture: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DEVICE: {
      return {
        ...state,
        device: action.payload.data
      };
    }
    case SET_MOISTURE: {
      return {
        ...state,
        moisture: action.payload.data
      };
    }
    default:
      return state;
  }
}

