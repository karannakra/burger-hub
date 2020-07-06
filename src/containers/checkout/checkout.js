import React ,{Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
import ContactData from "./contactData/contactData";
import {connect} from "react-redux";
import CheckOutSummary from "../../components/order/CheckOutSummary/CheckOutSummary";
class Checkout extends Component{
    checkoutHandler=()=>{
        this.props.history.goBack();
    }
    checkoutContinued=()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    render()
    {
        let summary=<Redirect to='/'/>
        if(this.props.ings){
            summary=(<div>
                <CheckOutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutHandler}
                    checkoutContinued={this.checkoutContinued}/>
                     <Route
                path={this.props.match.url+'/contact-data'}
                component={ContactData}/>
                </div>
            )
        }
        return summary;
    }
}
const mapStateToProps=state=> {
    return {
        ings: state.burgerBuilder.ingredients
    }

}

export default connect(mapStateToProps)(Checkout);