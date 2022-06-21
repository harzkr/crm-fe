import React from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import './styles.css';

const Login = () => {
  const [formType, setFormType] = React.useState("login");
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <div className="formContainer">
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

        <Typography
          style={{ cursor: "pointer" }}
          onClick={
            formType === "login"
              ? () => setFormType("signup")
              : () => setFormType("login")
          }
        >
          {formType === "login"
            ? "Don't Have an Account, Register Here"
            : "Already Have an Account, Login Here"}
        </Typography>
      </div>
    </div>
  );
};

export default Login;
