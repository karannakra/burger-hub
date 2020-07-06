import React from 'react';
import  classes from './navigation.css';
import NavigationItem from "./navigationItem/navigationItem";

const navigationItems=(props)=> {
    return(
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' exact>Burger Builder</NavigationItem>
        {props.isAuthenticated?<NavigationItem link='/orders'>Orders</NavigationItem>:null}
        {!props.isAuthenticated ?
            <NavigationItem link='/authactionjs'>authenticate</NavigationItem> :
            <NavigationItem link='/logout'>logout</NavigationItem>
        }
    </ul>
    )};
export default navigationItems;