import React,{useEffect}from 'react';
import axios from "../../axios";
import {connect} from "react-redux";
import * as actions from '../../store/actions';
import Order from "../../components/order/order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/spinner/spinner";
import {fetchOrders} from "../../store/actions";
const Orders =(props)=>{
    const {onFetchOrders}=props;
    useEffect(()=>{
        onFetchOrders(props.token,props.userId);
        // axios.get('/orders.json')
        //     .then(res=>{
        //         const fetchOrder=[];
        //         for(let key in res.data){
        //             fetchOrder.push({
        //                 ...res.data[key],
        //                 id:key
        //             });
        //         }
        //         this.setState({loading:false,orders:fetchOrder});
        //     })
        //     .catch(err=>{
        //         this.setState({loading:false});
        //     })

    },[fetchOrders])
        let orders=<Spinner/>;

        if(!props.loading){
            orders=(props.orders.map(order=>(
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />)))}
        return (
            <div>
                {orders}
            </div>
        );
}
const mapStateToProps=(state)=>{
    return{
        orders:state.orders.orders,
        loading:state.orders.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        onFetchOrders:(token,userId)=>dispatch(actions.fetchOrders(token,userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));