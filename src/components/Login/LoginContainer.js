import React from "react";
import { useQuery, useMutation } from 'react-query';
import Login from './Login';

const LoginContainer = () => {
    const logIn = async (data) => {
        console.log('passing the data',data);
        const response = await fetch('/login', {
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

    const {isLoading, isError, error, mutate} = useMutation(logIn, {retry: 3})

    const _props = {
        mutate,
    }

    return <Login {..._props}/>
}

export default LoginContainer;