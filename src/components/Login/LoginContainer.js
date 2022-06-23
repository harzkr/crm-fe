import React from "react";
import { useQuery, useMutation } from 'react-query';
import Login from './Login';

const LoginContainer = () => {
    const logIn = async (data) => {
        console.log('passing the data',data);
        const response = await fetch('/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).catch(err => {
            console.log(err,'seeing explicit err');
        })

        if (response.status !== 200) {
            const message = `An error has occured: ${response.status}`;
            console.log(response,'check check')
        }

        const userData = response.json();

        return userData;
    }

    const {isLoading, isError, error, mutate} = useMutation(logIn, {retry: 3})

    const _props = {
        mutate,
    }

    console.log(error,'check in react query');
    return <Login {..._props}/>
}

export default LoginContainer;