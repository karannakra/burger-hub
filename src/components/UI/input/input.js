import React from 'react';
import classes from './input.css';

const input=(props)=> {
    let inputElement=null;
    const inputClasses=[classes.InputElement];
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }
    switch (props.elementtype) {
        case ('input'):
            inputElement=<input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                 onChange={props.changed}
            />;
            break;
        case ('textarea'):
            inputElement=<textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                 onChange={props.changed}
            />;
            break;
        case ('select'):
            inputElement=(<select
                className={inputClasses.join(' ')}
                value={props.value}
                 onChange={props.changed}
            >
                {props.elementConfig.options.map((options)=>(
                    <option
                        key={options.value}
                        value={options.value}>{options.displayValue}</option>
                ))}
            </select>)
            break;
        default:
            inputElement=<input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />;
    }
    return(
    <div className={classes.Input}>
        <label className={classes.Label}>
            {props.label}
        </label>
        {inputElement}
    </div>
    )
}
export default input;