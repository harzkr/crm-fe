import React from "react";
import { useQuery, useMutation } from 'react-query';
import Login from './Login';
import { ApiResponse } from "../../utils/ApiResponse";

const LoginContainer = () => {
    const [generalError, setGeneralError] = React.useState(null);

    const logIn = async (data) => {
        const response = await ApiResponse('post', '/v1/api/login', data);
        console.log('response',response);
        return response;
    }

    const { mutate } = useMutation(logIn, {retry: 3})

    const _props = {
        mutate,
        generalError
    }

    return <Login {..._props}/>
}

export default LoginContainer;