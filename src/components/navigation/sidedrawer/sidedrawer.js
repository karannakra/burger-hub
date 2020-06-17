import React from 'react';
import Logo from "../../logo/logo";
import NavigationItems from "../navigationitem/navigationitem";
import classes from './sidedrawer.css';
import BackDrop from "../../UI/backdrop/backdrop";
import Auxiliary from '../../../hoc/Auxiliary'
const sideDrawer=(props)=> {
        let attachedClasses=[classes.SideDrawer,classes.Close];
        if(props.open){
            attachedClasses=[classes.SideDrawer,classes.Open];
        }
    return(
        <Auxiliary>
        <BackDrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
           <div className={classes.Logo}>
               <Logo/>
           </div>
           <nav>
               <NavigationItems/>
           </nav>
       </div>
        </Auxiliary>

    )

};



export default sideDrawer;