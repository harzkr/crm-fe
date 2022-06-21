import React from "react";
import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="email"
          label="Email"
          variant="filled"
          {...register("email")}
        />
        <TextField
          id="password"
          label="Password"
          variant="filled"
          {...register("password")}
        />

        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
