import * as actionTypes from './typeaction';
import axios from "../../axios";
export const purchaseBurgerSuccess=(id,orderData)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData,
    }
};
export const purchaseBurgerfailure=()=>{

    return{
        type:actionTypes.PURCHASE_BURGER_FAILURE,

    }
};
export const purhcaseBurgerStart=()=>{
    return{
        type:actionTypes.PURCHASE_BURGER_START,
    }
}
export const redirect=()=>{
        return{
            type:actionTypes.REDIRECT
        }
}
export const purchaseBurger=(orderData,token)=>{
    return dispatch=>{
        dispatch(purhcaseBurgerStart());
            axios.post('/orders.json?auth='+token,orderData)
                .then(response=>{
                      dispatch(purchaseBurgerSuccess(response.data.name,orderData))
                })
                .catch(()=>dispatch(purchaseBurgerfailure()))   ;
    }

};
export  const fetchOrderSuccess=(orders)=>{
    return{
        type:actionTypes.FETCH_ORDER_SUCCESS,
        orders:orders
    }
};
export const fetchOrderFails=(error)=>{
    return{
        type:actionTypes.FETCH_ORDER_FAILS,
        error:error
    }
};
export const fetchOrderStart=()=>{
    return{
        type:actionTypes.FETCH_ORDER_START
    }
};
export  const   fetchOrders=(token,userId)=>{
    return dispatch=>{
        dispatch(fetchOrderStart());
        const   queryparams='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('/orders.json'+queryparams)
            .then(res=>{
                const fetchOrder=[];
                for(let key in res.data){
                    fetchOrder.push({
                        ...res.data[key],
                        id:key
                    });
                }
                dispatch(fetchOrderSuccess(fetchOrder));
            })
            .catch(err=>{
               dispatch(fetchOrderFails(err));
            })

    }
}