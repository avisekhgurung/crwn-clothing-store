import {compose, applyMiddleware} from 'redux'
import { legacy_createStore as createStore } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';


const sagaMiddleware = createSagaMiddleware() ;
//use saga or thunk

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user'],
    whitelist: ['cart'],
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer)
//root reducer

const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type){
        return next(action);
    }
    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentState: ', store.getState());

    next(action);

    console.log('nextState: ', store.getState());
}

// const middleWares = [loggerMiddleware] ;

//const middleWares = [process.env.NODE_ENV !== 'production' && logger, thunk].filter(Boolean)

const middleWares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware].filter(Boolean)

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  ) || compose

const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares))

console.log(rootReducer,'rootReducer');



export const store = createStore(persistedReducer, undefined, composeEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store)