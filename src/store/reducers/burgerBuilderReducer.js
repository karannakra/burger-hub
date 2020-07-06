import * as actionType from '../actions/typeaction';
import {updateObjects} from "./utilityReducer";

const INGREDIENT_PRICES = {
    salad: 1,
    cheese: 2,
    meat: 1,
    bacon: 1
}
const initialState = {
    ingredients: null,
    totalPrice: 4,
    error:false,
    redirect:false,
    building:false
}
const addIngredient=(state,action)=>{
    const updatedIngredient={ [action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngredients=updateObjects(state.ingredients,updatedIngredient)
    const updatedState=updateObjects(state,{ingredients:updatedIngredients,
        totalPrice:state.totalPrice +
        INGREDIENT_PRICES[action.ingredientName],
        building:true
        })
    return updateObjects(state,updatedState)
}
const removeIngredient=(state,action)=>{
    const updatedIngredient={ [action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    const updatedIngredients=updateObjects(state.ingredients,updatedIngredient)
    const updatedState=updateObjects(state,{ingredients:updatedIngredients, totalPrice: state.totalPrice +
            INGREDIENT_PRICES[action.ingredientName],
            building:true
    })
    return updateObjects(state,updatedState)
}

const SetIngredient=(state,action)=>{
    return updateObjects(state, {
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4,
        building:false
    })
}
const burgerBuilderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
          return addIngredient(state,action)

        case actionType.REMOVE_INGREDIENT:
           return removeIngredient(state,action)

        case actionType.SET_INGREDIENTS:
            return SetIngredient(state,action)

        case actionType.FETCH_INGREDIENTS_FAILS:
            return updateObjects(state,{error:true});
        default:
            return state
    }
};
export default burgerBuilderReducer;

