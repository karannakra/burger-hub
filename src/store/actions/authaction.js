import * as actions from './typeaction';

export const authStart=()=>{
    return{
        type:actions.AUTH_START
    };
};
export const authSuccess=(token,userId)=>{

return{
    type:actions.AUTH_SUCCESS,
    token:token,
    userId:userId
};
};
export const authFails=(error)=>{
    return{
        type:actions.AUTH_FAIL,
        error:error
    };
};
export const logout =()=>{
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
        return{
            type:actions.AUTH_INITIATE_LOGOUT
        };
}
export const logoutSucceed=()=>{
     return {
         type:actions.AUTH_LOGOUT
     }
}
export const checkAuthTimeOut=(expirationTime)=>{
    // return dispatch=>{
    //     setTimeout(()=>{
    //         dispatch(logout());
    //     },expirationTime*1000);
    //
    // };
    return {
            type:actions.AUTH_CHECK_TIMEOUT,
            expirationTime:expirationTime
    }
}

export const auth=(email,password,isSignup)=>{

    return {
       type:actions.AUTH_USER_SAGA,
       email:email,
       password:password,
       isSignup:isSignup
    }
    // return dispatch=>{
    //     dispatch(authStart());
    //     const authData={
    //         email:email,
    //         password:password,
    //         returnSecureToken:true
    //     }
    //     let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAAS2zF9QksNd_jbLgc5qc8AAW6pHqfXow'
    //     if(!isSignup){
    //         url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAAS2zF9QksNd_jbLgc5qc8AAW6pHqfXow'
    //     }
    //     axios.post(url,authData)
    //         .then(response=>{
    //             const expirationDate=new Date(new Date().getTime() +response.data.expiresIn * 1000)
    //             localStorage.setItem('token',response.data.idToken);
    //             localStorage.setItem('expirationDate',expirationDate);
    //             localStorage.setItem('userId',response.data.localId);
    //             dispatch(authSuccess(response.data.idToken,response.data.localId));
    //             dispatch(checkAuthTimeOut(response.data.expiresIn))
    //         })
    //         .catch(err=>{
    //             dispatch(authFails(err.response.data.error));
    //         })
    // }
}
export const setAuthRedirectPath=(path)=>{
    return{
        type:actions.SET_AUTH_REDIRECT_PATH,
        path:path
    }
};
export const authCheckState=()=>{


    return {
        type:actions.AUTH_AUTOLOGIN_SAGA
    }
    // return dispatch=>{
    //         const token=localStorage.getItem('token');
    //         if(!token){
    //             dispatch(logout())
    //         }else
    //         {
    //             const  expirationDate= new Date(localStorage.getItem('expirationDate'));
    //             if(expirationDate<=new Date()){
    //                 dispatch(logout())
    //             }
    //             else{
    //                 const userId=localStorage.getItem('userId');
    //                 dispatch(authSuccess(token,userId));
    //                 dispatch(checkAuthTimeOut((expirationDate.getTime()-new Date().getTime())/1000))
    //                 }
    //         }
    // };
}