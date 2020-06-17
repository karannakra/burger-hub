import React from 'react';
import classes from './toolbar.css';
import Logo from '../../logo/logo';
import NavigationItem from "../navigationitem/navigationitem";
import DrawerToggle from "../sidedrawer/drawerToggle/drawerToggle";

const toolbar=(props)=>(
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItem/>
        </nav>
    </header>
)
export default toolbar;