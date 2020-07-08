import * as actionTypes from '../actions/typeaction';
import {updateObjects} from "../../shared/utilityReducer";

const initialState = {
    orders: [],
    loading: false,
    redirect: false
}
const redirect = (state) => {
    return updateObjects(state, {redirect: false})
}
const purchaseBurgerStart = (state) => {
    return updateObjects(state, {loading: true})
}
const purchaseBugerSuccess = (state, action) => {
    const newOrder = updateObjects(action.orderData, {id: action.orderId})
    return updateObjects(state, {loading: false, orders: state.orders.concat(newOrder), redirect: true})
}
const purchaseBurgerFail = (state) => {
    return updateObjects(state, {loading: false})
}
const fetchOrderStart = (state) => {
    return updateObjects(state, {loading: true})
}
const fetchOrderSuccess = (state, action) => {
    return updateObjects(state, {orders: action.orders, loading: false})
}
const fetchOrderFail = (state) => {
    return updateObjects(state, {loading: false})
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.REDIRECT):
            return redirect(state);

        case (actionTypes.PURCHASE_BURGER_START):
            return purchaseBurgerStart(state);

        case (actionTypes.PURCHASE_BURGER_SUCCESS):
            return purchaseBugerSuccess(state, action);

        case (actionTypes.PURCHASE_BURGER_FAILURE):
            return purchaseBurgerFail(state);

        case (actionTypes.FETCH_ORDER_START):
            return fetchOrderStart(state)

        case (actionTypes.FETCH_ORDER_SUCCESS):
            return fetchOrderSuccess(state, action);

        case (actionTypes.FETCH_ORDER_FAILS):
            return fetchOrderFail(state);
        default:
            return state;
    }
};
export default reducer;