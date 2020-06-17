import React,{Component}from 'react';
import Button from '../UI/Button/button';
import Aux from '../../hoc/Auxiliary';
class OrderSummary extends Component{
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[OrderSummary Will]')
    }

    render(){
         const ingredientSummary=Object.keys(this.props.ingredients)
         .map(igKey=><li key={igKey}><span style={{textTransform:'capatalize'}}>{igKey}
        </span> : {this.props.ingredients[igKey]}</li>)
         return (<Aux>
             <h3>Your Order</h3>
             <p>A delicious burger with the following ingredients:</p>
             <ul >
                 {ingredientSummary}
             </ul>
             <p>Continue to checkout</p>
             <div><span style={{marginRight:'270px'}}>
                   <Button btnType='btn btn-danger' clicked={this.props.purchaseCancel}>CANCEL</Button>
                        </span>
                 <Button btnType='btn btn-success' clicked={this.props.purchaseContinue}>CONTINUE</Button>
             </div>
             <p>Total Payment:<strong>{this.props.price}$</strong></p>
         </Aux>);}
};
export default OrderSummary;