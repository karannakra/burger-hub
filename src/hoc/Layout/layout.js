import React,{useState}from 'react';
import {connect} from 'react-redux';
import classes from './Layout.css';
import Aux from '../auxiliary/Auxiliary';
import Toolbar from '../../components/navigation/toolbar/toolbar'
import SideDrawer from "../../components/navigation/sidedrawer/sidedrawer";

const  Layout =(props)=>{
  // state={
  //     showSideDrawer:false
  // }
    const [showSideDrawer,setSideDrawerState]=useState(false)

    const sideDrawerClosedHandler=()=>{
        // this.setState({showSideDrawer:false});
        setSideDrawerState(false)
    }
    const SideDrawerToggleHandler=()=> {
        // this.setState((prevState) => {
        //     return {showSideDrawer: !prevState.showSideDrawer};
        // });
        setSideDrawerState(!showSideDrawer)
    }

    return (
            <Aux>
                <Toolbar
                    isAuth={props.isAuthenticated}
                    drawerToggleClicked={SideDrawerToggleHandler}/>
                <SideDrawer
                    isAuth={props.isAuthenticated}
                    closed={sideDrawerClosedHandler} open={showSideDrawer}/>
                <main className={classes.Content}>
                    {props.children}
                </main>
            </Aux>
        );


}
const mapStateToProps=(state)=>{
    return{
            isAuthenticated:state.auth.token !== null
    };

};

export default connect(mapStateToProps)(Layout);