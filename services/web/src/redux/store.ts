import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage

import rootReducer from './rootReducer';

const middlewares = [logger, thunk];

//Setting up redux-persist

const persistConfig = {
  key: 'root',
  storage,
  //only persisting requests, can add any top level state here i.e users, notifications
  whitelist: ['requests'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer, applyMiddleware(...middlewares));
let persistor = persistStore(store);
//eslint-disable-next-line
export { store, persistor };
