import React from 'react';
import classes from './modal.css';
import Auxiliary from '../../../hoc/auxiliary/Auxiliary'
import BackDrop from "../backdrop/backdrop";
const Modal=(props)=>{
    // shouldComponentUpdate(nextProps, nextState) {
    //         return nextProps.show!==this.props.show||nextProps.children!==this.props.children;
    // }
        return (
            <Auxiliary>
                <BackDrop show={props.show} clicked={props.modalClosed}/>
                <div style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '1'
                }} className={classes.Modal}>
                    {props.children}
                </div>
            </Auxiliary>
        );
}

export default React.memo(Modal,(prevProps,nextProps)=> {
  return  nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
});