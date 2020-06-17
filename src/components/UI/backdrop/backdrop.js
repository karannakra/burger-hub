import React from 'react';
import classes from './backDrop.css'

const backDrop=(props)=>{
    return(
            props.show?<div className={classes.BackDrop} onClick={props.clicked}/>:null
    )

}

export default backDrop;