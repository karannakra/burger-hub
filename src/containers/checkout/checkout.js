import React  from 'react';
import {Route,Redirect} from 'react-router-dom';
import ContactData from "./contactData/contactData";
import {connect} from "react-redux";
import CheckOutSummary from "../../components/order/CheckOutSummary/CheckOutSummary";
const Checkout =(props)=>{
   const checkoutHandler=()=>{
        props.history.goBack();
    }
  const  checkoutContinued=()=>{
        props.history.replace('/checkout/contact-data');
    }
        let summary=<Redirect to='/'/>
        if(props.ings){
            summary=(<div>
                <CheckOutSummary
                    ingredients={props.ings}
                    checkoutCancelled={checkoutHandler}
                    checkoutContinued={checkoutContinued}/>
                     <Route
                path={props.match.url+'/contact-data'}
                component={ContactData}/>
                </div>
            )
        }
        return summary;
}
const mapStateToProps=state=> {
    return {
        ings: state.burgerBuilder.ingredients
    }

}

export default connect(mapStateToProps)(Checkout);