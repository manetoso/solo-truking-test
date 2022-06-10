import { configureStore } from '@reduxjs/toolkit'
import { compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/rootReducer';

// REDUX STORE
// THE DEVTOOLS_EXTENSION IS AN EXTENSION FOR CHROME AND FIREFOX TO SEE THE STATE MANAGMENT

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = configureStore({
  reducer: rootReducer
},
  composeEnhancers(applyMiddleware(thunk))
);
