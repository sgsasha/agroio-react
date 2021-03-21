import accountReducer from './accountReducer';
import devicesReducer from './devicesReducer';
import deviceReducer from './deviceReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  accountReducer,
  devicesReducer,
  deviceReducer
});

export default rootReducer