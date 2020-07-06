import React,{Component} from 'react';
import {connect} from 'react-redux';
import classes from './Layout.css';
import Aux from '../auxiliary/Auxiliary';
import Toolbar from '../../components/navigation/toolbar/toolbar'
import SideDrawer from "../../components/navigation/sidedrawer/sidedrawer";

class Layout extends Component{
  state=({
      showSideDrawer:false
  })

    sideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false});
    }
    SideDrawerToggleHandler=()=> {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }
    render() {
        return (
            <Aux>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.SideDrawerToggleHandler}/>
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }

}
const mapStateToProps=(state)=>{
    return{
            isAuthenticated:state.auth.token !== null
    };

};

export default connect(mapStateToProps)(Layout);