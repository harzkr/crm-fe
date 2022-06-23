import React from "react";
import { useQuery, useMutation } from 'react-query';
import Login from './Login';

const LoginContainer = () => {
    const {isLoading, isError, error, mutate} = useMutation(logIn, {retry: 3})

    const logIn = async (data) => {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }

        const userData = response.json();

        return userData;
    }

    const _props = {
        mutate,
    }

    return <Login {..._props}/>
}

export default LoginContainer;