import React from "react";
import { useQuery, useMutation } from 'react-query';
import Login from './Login';
import { ApiResponse } from "../../utils/ApiResponse";

const LoginContainer = () => {
    const [generalError, setGeneralError] = React.useState(null);

    const logIn = async (data) => {
        try{
            const response = await ApiResponse('post', '/v1/auth/login', data);
            console.log('response',response);
            return response;
        } catch(err){
            console.log(err.data.message);
            setGeneralError(err.data.message);
        }
    }

    const register = async (data) => {
        try{
            const response = await ApiResponse('post', '/v1/auth/register', data);
            console.log('response',response);
            return response;
        } catch(err){
            console.log(err.data.message);
            setGeneralError(err.data.message);
        }
    }

    const { mutate } = useMutation(logIn, {retry: 1})
    const { mutate:mutateRegister } = useMutation(register, {retry: 1})

    const _props = {
        mutate,
        mutateRegister,
        generalError
    }

    return <Login {..._props}/>
}

export default LoginContainer;