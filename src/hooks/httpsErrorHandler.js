import {useState,useEffect} from 'react';
export default httpClient=>{
    const [error,setError]=useState(null);
    const reqIncerptor=httpClient.interceptors.request.use(req=>{
        setError(null)
        return req;
    });
    const resInterceptor=httpClient.interceptors.response.use(res=>res,err => {
        setError(err)
    });

    useEffect(()=>{
        return ()=>{
            httpClient.interceptors.request.eject(reqIncerptor);
            httpClient.interceptors.response.eject(resInterceptor);
        }
    },[reqIncerptor,resInterceptor]);

    const errorConfirmerHandler=()=>{
        setError(null)
    }
    return [error,errorConfirmerHandler];
}