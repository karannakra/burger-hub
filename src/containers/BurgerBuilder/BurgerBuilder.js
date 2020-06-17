import React,{Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControl";
import OrderSummary from "../../components/orderSummary/OrderSummary";
import Modal from "../../components/UI/modal/modal";

const INGREDIENT_PRICES={
    salad:1,
    cheese:2,
    meat:1,
    bacon:1
}
class BurgerBuilders extends Component{

    state=({
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice:4,
        purchasable:false,
        purchasing:false
    });
    updatePurchaseState(ingredients){
        const sum=Object.keys(ingredients)
            .map(igKey=>{
                return ingredients[igKey]
            }).reduce((sum,el)=>sum+el,0);
        this.setState({purchasable:sum>0});
    }
    addIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        const updatedCount=oldCount+1;
        const updatedIngredients={...this.state.ingredients};
        updatedIngredients[type]=updatedCount;
        const priceAddition=INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice+priceAddition;
        this.setState({
            totalPrice:newPrice,ingredients:updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredients=(type)=>{
        const oldCount=this.state.ingredients[type];
        if(oldCount<=0){
            return;
        }
        const updatedCount=oldCount-1;
            const updatedIngredients={...this.state.ingredients};
            updatedIngredients[type]=updatedCount;
            const priceReduction=INGREDIENT_PRICES[type];
            const oldPrice=this.state.totalPrice;
            const newPrice=oldPrice-priceReduction;
            this.setState({
                totalPrice:newPrice,ingredients:updatedIngredients
            })
            this.updatePurchaseState(updatedIngredients);

    }
    purchaseHandler=()=>{
        this.setState({purchasing:true})
        console.log('click')
    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }
    purchaseContinueHandler=()=>{
        alert('itne sare paise kha se laega bc km kar order')
    }
    render() {
        const disableInfo={
            ...this.state.ingredients
        };
        for(let key in disableInfo){
            disableInfo[key]=disableInfo[key]<=0
        }

        return(
            <Aux >
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients} price={this.state.totalPrice}
                        purchaseCancel={this.purchaseCancelHandler}
                        purchaseContinue={this.purchaseContinueHandler}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    removeIngredient={this.removeIngredients}
                    disabled={disableInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        );

    }
}

export default BurgerBuilders;
