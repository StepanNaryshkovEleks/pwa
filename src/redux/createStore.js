import {createStore, applyMiddleware, compose} from 'redux';
import createSageMiddleware from 'redux-saga';
import rootSaga from './sagas';
import reducers from './reducers';

const sagaMiddleware = createSageMiddleware();

const composeEnhancers =
  global?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function initStore(initialState = {}, additionalMiddlewares = []) {
  const middlewares = composeEnhancers(applyMiddleware(sagaMiddleware, ...additionalMiddlewares));
  const store = createStore(reducers, initialState, middlewares);

  sagaMiddleware.run(rootSaga);

  return store;
}
