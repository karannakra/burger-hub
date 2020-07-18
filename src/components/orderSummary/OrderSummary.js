import React from 'react';
import Button from '../UI/Button/button';
import Aux from '../../hoc/auxiliary/Auxiliary';
const OrderSummary =(props)=>{
         const ingredientSummary=Object.keys(props.ingredients)
         .map(igKey=><li key={igKey}><span style={{textTransform:'capatalize'}}>{igKey}
        </span> : {props.ingredients[igKey]}</li>)
         return (<Aux>
             <h3>Your Order</h3>
             <p>A delicious burger with the following ingredients:</p>
             <ul >
                 {ingredientSummary}
             </ul>
             <p>Continue to checkout</p>
             <div>
                   <Button btnType='Danger' clicked={props.purchaseCancel}>CANCEL</Button>
                 <Button btnType='Success' clicked={props.purchaseContinue}>CONTINUE</Button>
             </div>
             <p>Total Payment:<strong>{props.price}$</strong></p>
         </Aux>);

};
export default OrderSummary;