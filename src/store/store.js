import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './root-saga';

import { rootReducer } from './root-reducer';


const persistConfig = {
  key: 'root',
  storage, //Short-hand passing value as key
  whitelist: ['cart'],
}

const sagaMiddleaware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);
// Should avoid Logging in production environment
const middleWares = [
  process.env.NODE_ENV !== 'production' && logger, 
  sagaMiddleaware
].filter(Boolean);

const composeEnhancer = (
  process.env.NODE_ENV !== 'production' && 
  window && 
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer, 
  undefined, 
  composedEnhancers
);

sagaMiddleaware.run(rootSaga);

export const persistor = persistStore(store);