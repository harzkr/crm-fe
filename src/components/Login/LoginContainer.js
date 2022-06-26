import React from "react";
import { useMutation } from 'react-query';
import Login from './Login';
import { ApiResponse } from "../../utils/ApiResponse";
import { useNavigate } from "react-router-dom";

const userUpdate = (data) => {
    const { tokens } = data;

    const { user } = data;
    localStorage.setItem("accessToken", tokens.access.token);
    localStorage.setItem("refreshToken", tokens.refresh.token);
      
    if(user){
      localStorage.setItem("email", user.email);
      localStorage.setItem("name", user.name);
      localStorage.setItem("userId", user.id);
    }
}

const LoginContainer = () => {
    const navigate = useNavigate();
    const [generalError, setGeneralError] = React.useState(null);

    const logIn = async (data) => {
        try{
            const response = await ApiResponse('post', '/v1/auth/login', data);
            return response;
        } catch(err){
            setGeneralError(err.data.message);
        }
    }

    const register = async (data) => {
        try{
            const response = await ApiResponse('post', '/v1/auth/register', data);
            return response;
        } catch(err){
            setGeneralError(err.data.message);
        }
    }

    const { mutate, data:dataLogin } = useMutation(logIn, {retry: 1})
    const { mutate:mutateRegister, data:dataRegister } = useMutation(register, {retry: 1})

    React.useEffect(()=>{
        if(dataLogin && dataLogin.data){
          userUpdate(dataLogin.data);

          navigate('/');
        }

        if(dataRegister && dataRegister.data){
            userUpdate(dataRegister.data);
  
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