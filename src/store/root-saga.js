import { all, call } from 'redux-saga/effects';
import { categoriesSaga } from './categories/categories.saga';
import { userSagas } from './user/user.saga';
/**
 * populate the root saga with all other Sagas
 * this generator function will be used. 
 */
export function* rootSaga() {
    /**
     * todo what about not using call, given that all can also have the generator function list.
     */
    yield all([call(categoriesSaga), call(userSagas)]);
}