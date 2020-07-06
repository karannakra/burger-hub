import  classes from './button.css';
import React from "react";
const button=(props)=>{
    let btn=[classes.Button]
    btn.push(classes[props.btnType])
    return(
        <button className={btn.join(' ')}
        disabled={props.disabled}
        onClick={props.clicked}>{props.children}</button>
    )
}

export default button;