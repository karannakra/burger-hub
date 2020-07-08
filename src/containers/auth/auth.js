import React,{Component} from 'react';
import Input from "../../components/UI/input/input";
import Button from "../../components/UI/Button/button";
import  {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import classes from './auth.css';
import {updateObjects} from '../../shared/utilityReducer'
import Spinner from "../../components/UI/spinner/spinner";
import * as actions from '../../store/actions';
class Auth extends Component{
    componentDidMount() {
            if(!this.props.buildingBurger && this.props.authRedirectPath!=='/'){
                this.props.onSetAuthRedirectPath();
            }
    }
    state={
        controls:{
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email Address'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password: {
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
            }
        },
        isSignup:true
    }
    checkValidity(value,rules){
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
        if(rules.isEmail){
            const pattern=/[a-z0-9!#$%&'*+=/{^}_?]+(@)/;
            isValid=pattern.test(value) && isValid
        }
        return isValid
    }
    inputChangeHandler=(event,controlName)=> {
        const updatedControls=updateObjects(this.state.controls,{
            [controlName]:updateObjects(this.state.controls[controlName],{
                value:event.target.value,
                valid:this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            })
            });
        this.setState({controls:updatedControls})
    };

    submitHandler=(event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
    }
    switchAuthHandler=()=>{
        this.setState((prevState=>{
            return {isSignup:!prevState.isSignup};
        }))
    }
    render() {

        const formElementArray=[];
        for(let key in this.state.controls){
            formElementArray.push({
                id:key,
                config:this.state.controls[key]
            });
        }
        let form=(
            <form onSubmit={this.submitHandler}>
                {formElementArray.map(formElement=>(
                    <Input
                        key={formElement.id}
                        elementtype={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        elementValue={formElement.config.value}
                        shouldValidate={formElement.config.validation}
                        changed={(event)=>this.inputChangeHandler(event,formElement.id)}
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                    />
                ))}
                <Button btnType="Success" >Submit</Button>
            </form>
        );
        if(this.props.loading){
            form=<Spinner/>
        }
        let errorMessage=null;
       let error=null;
        if(this.props.error){
            switch (this.props.error.message) {
                case 'INVALID_EMAIL':
                    error='The Email is not valid '
                    break;
                case 'EMAIL_EXISTS':
                    error='The Entered Email is already taken '
                    break;
                case 'INVALID_PASSWORD':
                    error='Password is not correct'
                    break;
                case 'EMAIL_NOT_FOUND':
                    error='The given email does not exist in our database do signup instead '
                    break;
                case 'MISSING_PASSWORD':
                    error='the password is missing'
                    break;
                default:
                    error=' BUND MARRAAAA '

            }
            errorMessage=<div className='alert alert-warning'><span>&#9888;</span>{error}<span>&#9888;</span></div>
        }
        let redirect=null
        if(this.props.isAuthenticated){
            redirect=<Redirect to={this.props.authRedirectPath}/>
        }
        return (
            <div className={classes.Auth}>
                {redirect}
                {errorMessage}
                {form}
                <Button btnType='Danger'
                        clicked={this.switchAuthHandler}>
                    {this.state.isSignup?'Switch To Signin':'Switch To Signup'}</Button>
            </div>
        );
    }
}
const mapStateToProps=state=>{
    return{
        error:state.auth.error,
        loading:state.auth.loading,
        isAuthenticated:state.auth.token!==null,
        buildingBurger:state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};
const  mapDispatchToProps=(dispatch)=>{
    return{
        onAuth:(email,password,isSignup)=>dispatch(actions.auth(email,password,isSignup)),
        onSetAuthRedirectPath:()=>dispatch(actions.setAuthRedirectPath('/'))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);