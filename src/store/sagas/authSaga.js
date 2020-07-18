import {put,delay,call} from 'redux-saga/effects';
import {
    logoutSucceed
    ,logout
    ,authSuccess
    ,authFails
    ,checkAuthTimeOut
    ,authStart
} from "../actions";
import axios from "axios";
 export function* logoutSaga(action) {
     // yield call([localStorage,'removeItem'],'token')
   yield localStorage.removeItem('token');
   yield localStorage.removeItem('expirationDate');
   yield localStorage.removeItem('userId');
   yield put(logoutSucceed());

}

export function* checkAuthTimeOutSaga(action) {
     yield delay(action.expirationTime*1000);
     yield put(logout())

}
export function* authenticatedUserSaga(action) {
    yield put(authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAAS2zF9QksNd_jbLgc5qc8AAW6pHqfXow'
    if (!action.isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAAS2zF9QksNd_jbLgc5qc8AAW6pHqfXow'
    }
    try {
        const response = yield axios.post(url, authData);

        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000)
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(authSuccess(response.data.idToken, response.data.localId));
        yield put(checkAuthTimeOut(response.data.expiresIn))
    } catch (err) {

          yield put(authFails(err.response.data.error));
    }
 }
 export function* autoSignInSaga(action) {
         const token= yield localStorage.getItem('token');
         if(!token){
             yield put(logout())
         }else
         {
             const  expirationDate=yield new Date(localStorage.getItem('expirationDate'));
             if(expirationDate<=new Date()){
                 yield put(logout())
             }
             else{
                 const userId= yield localStorage.getItem('userId');
                 yield put(authSuccess(token,userId));
                 yield put(checkAuthTimeOut((expirationDate.getTime()-new Date().getTime())/1000))
             }
         }
 }