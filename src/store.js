  
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import saga from "./saga";

const initialiseSagaMiddleware = createSagaMiddleware();

const storeEnhancers = compose;

const store = createStore(
  rootReducer,
  storeEnhancers(
    applyMiddleware( initialiseSagaMiddleware)
  )
);

initialiseSagaMiddleware.run(saga);

export default store;