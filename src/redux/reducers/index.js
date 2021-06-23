import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import user from './user';

const reducers = combineReducers({
  router: routerReducer,
  user
});

export default reducers;
