import { combineReducers } from 'redux';
import { todosReducer } from './todosReducer';

// ROOT REDUCER IN CASE THAT WE NEED MORE THAN ONE REDUCER

export const rootReducer = combineReducers({
  todos: todosReducer,
});
