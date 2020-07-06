import * as actionTypes from './typeaction';
import * as actionType from "./typeaction";
import axios from "../../axios";
export const addIngredient=(Name)=>{
    return{
        type:actionType.ADD_INGREDIENT,
        ingredientName:Name}
}
export const removeIngredient=(Name)=>{
    return  {
        type:actionType.REMOVE_INGREDIENT,
        ingredientName:Name
    }
};

export const setIngredients=(ingredients)=>{
    return {
            type:actionTypes.SET_INGREDIENTS,
            ingredients:ingredients
    };
}
export const fetch_ingredients_fails=()=>{
    return {type:actionTypes.FETCH_INGREDIENTS_FAILS}
}
export const initIngredients=()=>{
    return dispatch=>{
        axios.get('/ingredients.json')
            .then(res=>{
                dispatch(setIngredients(res.data))
            })
            .catch(error=>{
                dispatch(fetch_ingredients_fails());
            })
    };
};