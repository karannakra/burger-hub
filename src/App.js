import React, { Component,Suspense} from 'react';
import BurgerBuilders from "./containers/BurgerBuilder/BurgerBuilder";
import Spinner from "./components/UI/spinner/spinner";
import {Route, Switch,withRouter,Redirect, } from 'react-router-dom';
import Layout from "./hoc/Layout/layout";
import {connect} from 'react-redux';
import {authCheckState} from "./store/actions";
import Checkout from "./containers/checkout/checkout";
const Orders=React.lazy(()=>import("./containers/orders/orders"));
const Auth =React.lazy(()=>import("./containers/auth/auth"));
const Logout=React.lazy(()=>import("./containers/auth/Logout/Logout"));
class App extends Component{
    componentDidMount() {
        this.props.onTryAutoSignUp();
    }
    render() {
        let Routes=(<Switch>
            <Route path='/authactionjs' render={()=>(
                <Suspense fallback={<Spinner/>}>
                    <Auth/>
                </Suspense>
            )}/>
             <Route path="/" exact component={BurgerBuilders}/>
             <Redirect to='/'/>
            </Switch>
        )
        if(this.props.isAuthenticated){
         Routes=( <Switch>
                <Route path="/checkout" component={Checkout}/>
                <Route path="/orders" render={()=>(
                    <Suspense fallback={<Spinner/>}>
                        <Orders/>
                    </Suspense>
                )}/>
                 <Route path='/authactionjs' component={Auth}/>
                 <Route path="/logout" render={()=>(
                     <Suspense fallback={<Spinner/>}>
                         <Logout/>
                     </Suspense>
                 )}/>
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
