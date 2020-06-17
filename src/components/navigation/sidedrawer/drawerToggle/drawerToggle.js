import React from 'react';
import classes from '../sidedrawer.css'

const drawerToggle=(props)=>
{
    let attachedClasses=['btn btn-warning',classes.btn]
    return(
    <div onClick={props.clicked}><button className={attachedClasses.join(' ')}><i className='fas fa-bars'/></button></div>
);}
export default drawerToggle;