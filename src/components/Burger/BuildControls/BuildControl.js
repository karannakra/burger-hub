import React from 'react';

import classes from './BuildControl.css';

import BuildControl from './BuildControl/BuildControl';

const controls=[
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'}];

const BuildControls=(props)=>(
    <div className={classes.BuildControls}>
        <p className={classes.price}>Current Price:{props.price}$</p>
        {controls.map(ctrl=>(
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={()=>props.ingredientAdded(ctrl.type)}
                removed={()=>props.removeIngredient(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable} onClick={props.ordered}>ORDER NOW</button>
    </div>
)
export  default BuildControls;
