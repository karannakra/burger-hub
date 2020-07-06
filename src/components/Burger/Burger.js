import React from 'react';
import {withRouter} from 'react-router-dom';
import classes from './Burger.css';

import BurgerIngredient from "./BurderIngredients/BurderIngriedients";

const burger=(props)=>{
        let TransformedIngredients=Object.keys(props.ingredients).map((igKey)=>{
                return[...Array(props.ingredients[igKey])].map((_,i)=>{
                   return <BurgerIngredient key={igKey+i} type={igKey}/>;
                });
        }).reduce((arr,curr)=>{
            return arr.concat(curr)
        },[]);
        if(TransformedIngredients.length===0){
            TransformedIngredients=<p className="alert alert-warning">Please Start Adding Ingredients</p>
        }
        return(
            <div className={classes.Burger}>
                <BurgerIngredient type="bread-top"/>
                {TransformedIngredients}
                <BurgerIngredient type="bread-bottom"/>
            </div>
        );

};

export default withRouter(burger);