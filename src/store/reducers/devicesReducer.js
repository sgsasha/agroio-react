import { SET_DEVICES } from "../actionTypes";

const initialState = {
  devices: [],
  total: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DEVICES: {
      return {
        devices: action.payload.data,
        total: action.payload.total
      };
    }
    default:
      return state;
  }
}

