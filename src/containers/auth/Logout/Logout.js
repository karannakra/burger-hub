import React,{useEffect}from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as action from '../../../store/actions';

const Logout=(props)=>{
    // componentDidMount() {
    //     this.props.onLogout();
    // }
    const {onLogout}=props;
            useEffect(()=>{
                onLogout();
            },[onLogout]);
        return (
            <Redirect to='/'/>
        );
    }
const mapDispatchToProps=(dispatch)=>{
    return{
        onLogout:()=>dispatch(action.logout())
    }
}

export  default connect(null,mapDispatchToProps)(Logout);