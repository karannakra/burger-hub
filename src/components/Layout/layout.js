import React,{Component} from 'react';

import classes from './Layout.css';

import Aux from '../../hoc/Auxiliary';
import Toolbar from '../navigation/toolbar/toolbar'
import SideDrawer from "../navigation/sidedrawer/sidedrawer";

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
                <Toolbar drawerToggleClicked={this.SideDrawerToggleHandler}/>
                <SideDrawer closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }

}



export default Layout;