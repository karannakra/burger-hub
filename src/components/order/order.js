import React from 'react';
import classes from './order.css';
const order=(props)=> {
    const ingredient=[];
    for(let ing in props.ingredients){
        ingredient.push({name:ing,amount:props.ingredients[ing]})
    }
    const ingredientOutput=ingredient.map(ig=>{
        return <span
            style={{
                textTransform:'capitalize',
                display:'inline-block',
                margin:'0 8px',
                border:'1px solid white',
                padding:'5px'
            }}
            key={ig.name}
        >{ig.name}({ig.amount})</span>;
    })
    return(
    <div className={classes.Order}>
        <p>Ingredients:{ingredientOutput}</p>
        <p>Price:<strong> {props.price} </strong></p>
    </div>
    )
}
export default order;