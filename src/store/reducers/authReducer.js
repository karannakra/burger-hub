import  * as actionType from '../actions/typeaction';
import {updateObjects} from "./utilityReducer";

const initialState={
    token:null,
    userId:null,
    error:null,
    loading:false,
    authRedirectPath:'/'
};
const authStart=(state,action)=>{
  return  updateObjects(state,{error:null,loading:true});
}
const authSuccess=(state,action)=>{
    return updateObjects(state,{
        error:null,
        loading:false,
        token:action.token,
        userId:action.userId,
    });
}
const authFail=(state,action)=>{
    return updateObjects(state,{
        error:action.error  ,
        loading:false

    })
}
const authLogOut=(state)=>{
    return updateObjects(state,{token:null,loading:false})

}
const setAuthRedirectPath=(state,action)=>{
    return updateObjects(state,{authRedirectPath:action.path})
}
const reducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionType.AUTH_START:
            return authStart(state,action)
        case actionType.AUTH_SUCCESS:
            return authSuccess(state,action)
        case actionType.AUTH_FAIL:
            return authFail(state,action)
        case actionType.AUTH_LOGOUT:
            return authLogOut(state)
        case actionType.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state,action)
        default:
            return state
    }

}

export default reducer;