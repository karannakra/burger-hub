import React, { useEffect,Suspense} from 'react';
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
const App = (props)=>{
    const {onTryAutoSignUp}=props;
    useEffect(()=>{
       onTryAutoSignUp();
    },[onTryAutoSignUp]);
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
        if(props.isAuthenticated){
         Routes=( <Switch>
                <Route path="/checkout" component={Checkout}/>
                <Route path="/orders" render={()=>(<Orders/>)}/>
                 <Route path='/authactionjs' component={Auth}/>
                 <Route path="/logout" render={()=>(<Logout/>)}/>
                 <Route path="/" exact component={BurgerBuilders}/>
                 <Redirect to='/'/>
            </Switch>
         )
        }
        return(
            <div>
                <Layout>
                    <Suspense fallback={<Spinner/>}>{Routes}</Suspense>
                </Layout>
            </div>
        );
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
