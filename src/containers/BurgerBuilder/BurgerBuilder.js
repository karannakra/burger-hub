import React,{useState,useEffect,useCallback} from 'react';
import Aux from '../../hoc/auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import {useDispatch,useSelector} from 'react-redux';
import BuildControls from "../../components/Burger/BuildControls/BuildControl";
import OrderSummary from "../../components/orderSummary/OrderSummary";
import Modal from "../../components/UI/modal/modal";
import axios from "../../axios";
import Spinner from "../../components/UI/spinner/spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {addIngredient,removeIngredient,setAuthRedirectPath,initIngredients} from"../../store/actions";
const BurgerBuilders =(props)=>{
    // state=({
    //     purchasable:false,
    //     purchasing:false,
    //
    // });
    // const [purchasable,setPurchasable]=useState(false);
    const [purchasing,setPurchasing]=useState(false);
    const ings= useSelector(state=>{
       return state.burgerBuilder.ingredients
    });
    const totalPrice=useSelector(state=>{
        return state.burgerBuilder.totalPrice
    });
    const error =useSelector(state=>{
        return state.burgerBuilder.error
    });
    const isAuthenticated=useSelector(state=>{
       return state.auth.token!==null
    });
    const dispatch =useDispatch();
    const  AddIngredientHandler=(ingName)=>dispatch(addIngredient(ingName));
    const  RemoveIngredientHandler=(ingName)=>dispatch(removeIngredient(ingName));
    const  initIngredientHandler=useCallback(()=>dispatch(initIngredients()),[]);
    const  onSetAuthRedirectPath=(input)=>dispatch(setAuthRedirectPath(input));

    useEffect(()=>{
        initIngredientHandler();
        // axios.get('/ingredients.json')
        //     .then(res=>{
        //         this.setState({ingredients:res.data})
        //     })
        //     .catch(error=>{
        //         this.setState({error:error})
        //     })
    },[initIngredientHandler]);
   const updatePurchaseState=(ingredients)=>{
        const sum=Object.keys(ingredients).map(igKey=>{
            return ingredients[igKey]
        }).reduce((sum,el)=>sum+el,0);
        return sum>0;
    // .map(igKey=>{
    //         return ingredients[igKey]
    //     }).reduce((sum,el)=>sum+el,0);
    }
    // addIngredientHandler=(type)=>{
    //     const oldCount=this.ings[type];
    //     const updatedCount=oldCount+1;
    //     const updatedIngredients={...this.ings};
    //     updatedIngredients[type]=updatedCount;
    //     const priceAddition=INGREDIENT_PRICES[type];
    //     const oldPrice=this.totalPrice;
    //     const newPrice=oldPrice+priceAddition;
    //     this.setState({
    //         totalPrice:newPrice,ingredients:updatedIngredients
    //     })
    //     this.updatePurchaseState(updatedIngredients);
    // }
    // removeIngredients=(type)=>{
    //     const oldCount=this.ings[type];
    //     if(oldCount<=0){
    //         return;
    //     }
    //     const updatedCount=oldCount-1;
    //         const updatedIngredients={...this.ings};
    //         updatedIngredients[type]=updatedCount;
    //         const priceReduction=INGREDIENT_PRICES[type];
    //         const oldPrice=this.totalPrice;
    //         const newPrice=oldPrice-priceReduction;
    //         this.setState({
    //             totalPrice:newPrice,ingredients:updatedIngredients
    //         })
    //         this.updatePurchaseState(updatedIngredients);
    //
    // }
   const purchaseHandler=()=>{
        if(isAuthenticated){
            setPurchasing(true)
        }
        else {
           onSetAuthRedirectPath('/checkout')
            props.history.push('/authactionjs')
        }

    }
   const purchaseCancelHandler=()=>{
        setPurchasing(false);
    }
   const purchaseContinueHandler=()=> {
        // const querryParams=[];
        // for(let i  in this.ings){
        //     querryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.ings[i]));
        // }
        // querryParams.push('price='+this.totalPrice);
        // const quertString=querryParams.join('&');
        props.history.push({pathname:'/checkout'})
    }
        const disableInfo={
            ...ings
        };
        for(let key in disableInfo){
            disableInfo[key]=disableInfo[key]<=0
        }
        let orderSummary=null;
        let burger=error?<p className={'alert alert-warning'} style={{textAlign:'center',fontWeight:'bold'}}>ingredients cannot be loaded &#x26A0;    </p>:<Spinner/>;
        if(ings){
            burger=(
                <Aux>
                    <Burger ingredients={ings}/>
                    <BuildControls
                        isAuthenticated={isAuthenticated}
                        ingredientAdded={AddIngredientHandler}
                        removeIngredient={RemoveIngredientHandler}
                        disabled={disableInfo}
                        price={totalPrice}
                        purchasable={updatePurchaseState(ings)}
                        ordered={purchaseHandler}/>
                </Aux>
            )
            orderSummary=<OrderSummary
                ingredients={ings} price={totalPrice}
                purchaseCancel={purchaseCancelHandler}
                purchaseContinue={purchaseContinueHandler}
            />
        }
        // if(this.state.loading){
        //     orderSummary=<Spinner/>;
        // }
        return(
            <Aux >
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
}
// const mapStateToProps=(state)=>{
//     return{
//         ings:state.burgerBuilder.ingredients,
//         totalPrice:state.burgerBuilder.totalPrice,
//         error:state.burgerBuilder.error,
//         isAuthenticated:state.auth.token!==null
//     };
//
// }
// const mapDispatchToProps=(dispatch)=>{
//     return{
//         AddIngredientHandler:(ingName)=>dispatch(addIngredient(ingName)),
//         RemoveIngredientHandler:(ingName)=>dispatch(removeIngredient(ingName)),
//         initIngredients:()=>dispatch(initIngredients()),
//         onSetAuthRedirectPath:(input)=>dispatch(setAuthRedirectPath(input))
//     };
// }

export default withErrorHandler(BurgerBuilders,axios);
