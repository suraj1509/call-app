import {combineReducers} from 'redux';
import {fetchUserReducer} from '../Reducers';

export const rootReducer = combineReducers({
  user: fetchUserReducer,
});
