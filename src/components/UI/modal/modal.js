import React,{Component}from 'react';
import classes from './modal.css';
import Auxiliary from '../../../hoc/auxiliary/Auxiliary'
import BackDrop from "../backdrop/backdrop";
class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
            return nextProps.show!==this.props.show||nextProps.children!==this.props.children;
    }
    render() {
        return (
            <Auxiliary>
                <BackDrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '1'
                }} className={classes.Modal}>
                    {this.props.children}
                </div>
            </Auxiliary>
        );
    }
}

export default Modal;