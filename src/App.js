import React, { Component } from 'react';
import BurgerBuilders from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/checkout/checkout";
import {Route, Switch,withRouter,Redirect} from 'react-router-dom';
import Layout from "./hoc/Layout/layout";
import {connect} from 'react-redux';
import Orders from "./containers/orders/orders";
import Auth from "./containers/auth/auth";
import {authCheckState} from "./store/actions";
import Logout from "./containers/auth/Logout/Logout";
class App extends Component{
    componentDidMount() {
        this.props.onTryAutoSignUp();
    }
    render() {
        let Routes=(<Switch>
            <Route path='/authactionjs' component={Auth}/>
             <Route path="/" exact component={BurgerBuilders}/>
             <Redirect to='/'/>
            </Switch>
        )
        if(this.props.isAuthenticated){
         Routes=(   <Switch>
                <Route path="/checkout" component={Checkout}/>
                <Route path="/orders" component={Orders}/>
                 <Route path='/authactionjs' component={Auth}/>
                 <Route path="/logout" component={Logout}/>
                 <Route path="/" exact component={BurgerBuilders}/>
                 <Redirect to='/'/>
            </Switch>
         )
        }
        return(
            <div>
                <Layout>
                    {Routes}
                </Layout>
            </div>
        );
    }
}
const mapStateToProps=state=>{
    return{
        isAuthenticated:state.auth.token
    }
}

const mapDispatchToProps=dispatch=>{
return{
    onTryAutoSignUp:()=>dispatch(authCheckState())
}
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
