import React,{Component} from 'react';
import Aux from '../../hoc/auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import {connect} from 'react-redux';
import BuildControls from "../../components/Burger/BuildControls/BuildControl";
import OrderSummary from "../../components/orderSummary/OrderSummary";
import Modal from "../../components/UI/modal/modal";
import axios from "../../axios";
import Spinner from "../../components/UI/spinner/spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {addIngredient,removeIngredient,initIngredients,setAuthRedirectPath} from"../../store/actions";
class BurgerBuilders extends Component{
    state=({
        purchasable:false,
        purchasing:false,

    });
    componentDidMount() {
        this.props.initIngredients();
        // axios.get('/ingredients.json')
        //     .then(res=>{
        //         this.setState({ingredients:res.data})
        //     })
        //     .catch(error=>{
        //         this.setState({error:error})
        //     })
    }
    updatePurchaseState(ingredients){
        const sum=Object.keys(ingredients).map(igKey=>{
            return ingredients[igKey]
        }).reduce((sum,el)=>sum+el,0);
        return sum>0;
    // .map(igKey=>{
    //         return ingredients[igKey]
    //     }).reduce((sum,el)=>sum+el,0);
    }
    // addIngredientHandler=(type)=>{
    //     const oldCount=this.props.ings[type];
    //     const updatedCount=oldCount+1;
    //     const updatedIngredients={...this.props.ings};
    //     updatedIngredients[type]=updatedCount;
    //     const priceAddition=INGREDIENT_PRICES[type];
    //     const oldPrice=this.props.totalPrice;
    //     const newPrice=oldPrice+priceAddition;
    //     this.setState({
    //         totalPrice:newPrice,ingredients:updatedIngredients
    //     })
    //     this.updatePurchaseState(updatedIngredients);
    // }
    // removeIngredients=(type)=>{
    //     const oldCount=this.props.ings[type];
    //     if(oldCount<=0){
    //         return;
    //     }
    //     const updatedCount=oldCount-1;
    //         const updatedIngredients={...this.props.ings};
    //         updatedIngredients[type]=updatedCount;
    //         const priceReduction=INGREDIENT_PRICES[type];
    //         const oldPrice=this.props.totalPrice;
    //         const newPrice=oldPrice-priceReduction;
    //         this.setState({
    //             totalPrice:newPrice,ingredients:updatedIngredients
    //         })
    //         this.updatePurchaseState(updatedIngredients);
    //
    // }
    purchaseHandler=()=>{
        if(this.props.isAuthenticated){
            this.setState({purchasing:true})
        }
        else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/authactionjs')
        }

    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }
    purchaseContinueHandler=()=> {
        // const querryParams=[];
        // for(let i  in this.props.ings){
        //     querryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.props.ings[i]));
        // }
        // querryParams.push('price='+this.props.totalPrice);
        // const quertString=querryParams.join('&');
        this.props.history.push({pathname:'/checkout'})
    }
    render() {

        const disableInfo={
            ...this.props.ings
        };
        for(let key in disableInfo){
            disableInfo[key]=disableInfo[key]<=0
        }
        let orderSummary=null;
        let burger=this.props.error?<p className={'alert alert-warning'} style={{textAlign:'center',fontWeight:'bold'}}>ingredients cannot be loaded &#x26A0;    </p>:<Spinner/>;
        if(this.props.ings){
            burger=(
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        isAuthenticated={this.props.isAuthenticated}
                        ingredientAdded={this.props.AddIngredientHandler}
                        removeIngredient={this.props.RemoveIngredientHandler}
                        disabled={disableInfo}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}/>
                </Aux>
            )
            orderSummary=<OrderSummary
                ingredients={this.props.ings} price={this.props.totalPrice}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
            />
        }
        // if(this.state.loading){
        //     orderSummary=<Spinner/>;
        // }
        return(
            <Aux >
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
const mapStateToProps=(state)=>{
    return{
        ings:state.burgerBuilder.ingredients,
        totalPrice:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated:state.auth.token!==null
    };

}
const mapDispatchToProps=(dispatch)=>{
    return{
        AddIngredientHandler:(ingName)=>dispatch(addIngredient(ingName)),
        RemoveIngredientHandler:(ingName)=>dispatch(removeIngredient(ingName)),
        initIngredients:()=>dispatch(initIngredients()),
        onSetAuthRedirectPath:(input)=>dispatch(setAuthRedirectPath(input))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilders,axios));
