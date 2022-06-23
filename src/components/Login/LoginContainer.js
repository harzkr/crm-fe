import React from "react";
import { useQuery, useMutation } from 'react-query';
import Login from './Login';
import axios from 'axios';

const LoginContainer = () => {
    const [generalError, setGeneralError] = React.useState(null);

    const logIn = async (data) => {
        try{
            console.log('passing the data',data);
            const response = await axios.post('/v1/auth/login', data);
    
            console.log(response,'see see')
    
            return response.data;
        }
        catch(err){
            console.log(err.response.data.message);
            setGeneralError(err.response.data.message);
        }
    }

    const { mutate } = useMutation(logIn, {retry: 3})

    const _props = {
        mutate,
        generalError
    }

    return <Login {..._props}/>
}

export default LoginContainer;