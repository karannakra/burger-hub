import React from 'react';
import Modal from "../../components/UI/modal/modal";
import Auxiliary from "../auxiliary/Auxiliary";
import useHttpErrorHandler from "../../hooks/httpsErrorHandler";
const withErrorHandler=(WrappedComponent,instance)=>{
    return props=>{
        // state={
        //     error:null,
        // }
       const [error,clearError]=useHttpErrorHandler(instance);

        return(
            <Auxiliary>
                <Modal show={error} modalClosed={clearError}>
                    {error?error.message:null}
                </Modal>
                <WrappedComponent {...props}/>
            </Auxiliary>
        );
    }
}
export default withErrorHandler;