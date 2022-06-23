import React from "react";
import { useMutation } from 'react-query';
import Login from './Login';
import { ApiResponse } from "../../utils/ApiResponse";
import { useNavigate } from "react-router-dom";

const LoginContainer = () => {
    const navigate = useNavigate();
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

    const { mutate, data:dataLogin } = useMutation(logIn, {retry: 1})
    const { mutate:mutateRegister, data:dataRegister } = useMutation(register, {retry: 1})

    React.useEffect(()=>{
        if(dataLogin && dataLogin.data){
          const { tokens } = dataLogin.data;

          const { user } = dataLogin.data;
          localStorage.setItem("accessToken", tokens.access.token);
          localStorage.setItem("refreshToken", tokens.refresh.token);
            
          if(user){
            localStorage.setItem("email", user.email);
            localStorage.setItem("name", user.name);
          }

          navigate('/');
        }

        if(dataRegister && dataRegister.data){
            const { tokens } = dataRegister.data;

            const { user } = dataRegister.data;
            localStorage.setItem("accessToken", tokens.access.token);
            localStorage.setItem("refreshToken", tokens.refresh.token);
              
            if(user){
              localStorage.setItem("email", user.email);
              localStorage.setItem("name", user.name);
            }
  
            navigate('/');
        }
    },[dataLogin, navigate, dataRegister])

    const _props = {
        mutate,
        mutateRegister,
        generalError
    }

    return <Login {..._props}/>
}

export default LoginContainer;