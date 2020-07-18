import {takeEvery,all,takeLatest} from 'redux-saga/effects';
import {logoutSaga, checkAuthTimeOutSaga, authenticatedUserSaga, autoSignInSaga} from './authSaga';
import * as actions from '../actions/typeaction';

 export function* watchAuth() {
     yield all([
         takeLatest(actions.AUTH_INITIATE_LOGOUT,logoutSaga),
         takeLatest(actions.AUTH_CHECK_TIMEOUT,checkAuthTimeOutSaga),
         takeLatest(actions.AUTH_USER_SAGA,authenticatedUserSaga),
         takeEvery(actions.AUTH_AUTOLOGIN_SAGA,autoSignInSaga)
     ]);
}
