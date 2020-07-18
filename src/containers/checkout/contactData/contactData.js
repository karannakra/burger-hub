import React ,{useState}from 'react';
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';
import Button from "../../../components/UI/Button/button";
import classes from './contactdata.css';
import Spinner from "../../../components/UI/spinner/spinner";
import axios from "../../../axios";
import Input from "../../../components/UI/input/input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import {purchaseBurger} from "../../../store/actions";
import {updateObjects} from '../../../shared/utilityReducer.js';
const ContactData =(props)=>{
   const [orderForm,setOrderForm]=useState({
                name: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                street: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Street'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                zipcode: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'ZIP CODE'
                    },
                    value:'',
                    validation:{
                        required:true,
                        minLength:5,
                        maxLength:10
                    },
                    valid:false,
                    touched:false
                },

                country:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Country'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                email:{
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'Your Email...'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                deliveryMethod:{
                    elementType:'select',
                    elementConfig:{
                        options:[
                            {value:'fastest',displayValue: 'Fastest'},
                            {value: 'cheapest',displayValue: 'Cheapest'}
                        ]
                    },
                    value:'fastest',
                    validation:{},
                    valid:true
                }
            })
          const [formIsValid,setFormIsValid]=useState(false);
   const orderHandler=(event)=>{
        event.preventDefault();
        const formData={};
        for(let formElementIdentifier in orderForm){
            formData[formElementIdentifier]=orderForm[formElementIdentifier].value
        }
        const order = {
            ingredients: props.ings,
            price: props.price+'$',
            orderData:formData,
            userId:props.userId
        }
        props.onOrder(order,props.token);
        // axios.post('/orders.json',order)
        //     .then(response=>{
        //         setState({loading:false});
        //  props.history.push('/');
        //     })
        //     .catch(error=>setState({loading:false}));

    }
     const checkValidity=(value,rules)=>{
            let isValid=true;
            if(rules.required){
                isValid=value.trim()!=='' && isValid;
            }
            if(rules.minLength){
                isValid=value.length>=rules.minLength && isValid;
            }
            if(rules.maxLength){
                isValid=value.length<=rules.maxLength && isValid;
            }
            return isValid
    }
   const onChangeHandler=(event,inputIdentifier)=>{
            const updatedFormElement=updateObjects(orderForm[inputIdentifier],{
                value:event.target.value,
                touched:true,
                valid:checkValidity(event.target.value,orderForm[inputIdentifier])
            })
            const updatedOrderForm=updateObjects(orderForm,{
                [inputIdentifier]:updatedFormElement
            })
            let formIsValid=true;
            for(let inputIdentity in updatedOrderForm){
                formIsValid=updatedOrderForm[inputIdentity].valid && formIsValid;
            }
            setOrderForm(updatedOrderForm);
            setFormIsValid(formIsValid)
    }
            const formElementArray=[];
            for(let key in orderForm ){
                formElementArray.push({
                    id:key,
                    config:orderForm[key]
                });
            }
            let form=(
                <form onSubmit={orderHandler}>
                    {formElementArray.map(formElement=>(
                        <Input
                            key={formElement.id}
                            elementtype={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            elementValue={formElement.config.value}
                            shouldValidate={formElement.config.validation}
                            changed={(event)=>onChangeHandler(event,formElement.id)}
                            invalid={!formElement.config.valid}
                            touched={formElement.config.touched}
                        />
                    ))}
                    <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
                </form>
            );
            if(props.loading){
                form=<Spinner/>
            }
            let redirect=null
            if(props.redirect){
                redirect=<Redirect to='/'/>
            }
        return (
            <div className={classes.ContactData}>
                <h4 style={{color:'white'}}>Enter Your Contact data</h4>
                {form}
                {redirect}
            </div>
        );


}
const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.orders.loading,
        redirect:state.orders.redirect,
        token:state.auth.token,
        userId:state.auth.userId
    }
}
const mapDispatchToProps=dispatch=>{
    return {
        onOrder:(orderData,token)=>dispatch(purchaseBurger(orderData,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));