import {all, call} from 'redux-saga/effects';
import { categoriesSaga } from './categories/category.saga';


//generator functions 
//async await is actually built on top of generator function
//generator function pause their execution whenever they see a speciifc ket inside func that key is yield
export function* rootSaga() {
    yield all([call(categoriesSaga)])
}
