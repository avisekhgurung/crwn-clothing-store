import { takeLatest, call, all, put, take} from 'redux-saga/effects';
import { getCategoriesAndDocuments } from '../../utils/firebase.utils';
import { fetchCategoriesFailed, fetchCategoriesSuccess } from './category.action';
import { CATEGORIES_ACTION_TYPES } from './category.types';

export function* fetchCategoriesAsync() {
    try {
        //call take method and parameter
        const categoriesArray = yield call(getCategoriesAndDocuments, 'categories') ;
       //dispatch( fetchCategoriesSuccess(categoriesArray));
       //instead of dispatch we use put 
       yield put(fetchCategoriesSuccess(categoriesArray))
    }
    catch (error) {
        // dispatch(fetchCategoriesFailed(error))
       yield put(fetchCategoriesFailed(error))

    }
}

export function* onFetchCategories(){
    //take latest is where we receive actions - means if you hear a bunch of the same action give me the latest one
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}


export function* categoriesSaga() {
    //all is essentially an effect that says hey run everything inside and only complete when all og it is done
    yield all([call(onFetchCategories)])
}