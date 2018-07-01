import { combineReducers } from 'redux';
import cars from './cars';

const combined = combineReducers({
  cars,
});

export default combined;
