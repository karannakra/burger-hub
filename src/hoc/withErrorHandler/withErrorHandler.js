import React,{Component}from 'react';
import Modal from "../../components/UI/modal/modal";
import Auxiliary from "../auxiliary/Auxiliary";

const withErrorHandler=(WrappedComponent,instance)=>{
    return class extends Component{
        state={
            error:null,
        }
        componentDidMount() {
            this.reqIncerptor=instance.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            });
            this.resInterceptor=instance.interceptors.response.use(res=>res,error => {
                            this.setState({error:error});
            });
        }
        componentWillUnmount() {
            instance.interceptors.request.eject(this.reqIncerptor);
            instance.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmerHandler=()=>{
            this.setState({error:null})
        }
        render() {
        return(
            <Auxiliary>
                <Modal show={this.state.error} modalClosed={this.errorConfirmerHandler}>
                    {this.state.error?this.state.error.message:null}
                </Modal>
                <WrappedComponent {...this.props}/>
            </Auxiliary>
        );}}}

export default withErrorHandler;