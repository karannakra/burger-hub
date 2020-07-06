import React,{Component}from 'react';
import {redirect} from  '../../../store/actions';
import {connect} from "react-redux";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/button";
import classes from './checkOutSummary.css';
class checkOutSummary extends Component{
    componentDidMount() {
        this.props.redirectStateHandler();
    }
    render() {
        return(
            <div className={classes.CheckOutSummary}>
                <h1>We hope it tastes Well!</h1>
                <div style={{width:'100%',margin:'auto'}}>
                    <Burger ingredients={this.props.ingredients}/>
                </div>
                <Button btnType="Danger" clicked={this.props.checkoutCancelled}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.checkoutContinued}>Continue</Button>
            </div>
        )
    }
    }
    const mapDispatchToProps=(dispatch)=>{
    return{
        redirectStateHandler:()=>dispatch(redirect())
    }

    }

export default connect(null,mapDispatchToProps)(checkOutSummary);