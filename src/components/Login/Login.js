import React from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import "./styles.css";

const Login = () => {
  const [formType, setFormType] = React.useState("login");
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="outerForm">
      <div className="formContainer">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {formType === "signup" && (
            <TextField
              id="name"
              label="Name"
              variant="filled"
              {...register("name")}
              className="field"
            />
          )}
          <TextField
            id="email"
            label="Email"
            variant="filled"
            {...register("email")}
            className="field"
          />
          <TextField
            id="password"
            label="Password"
            variant="filled"
            {...register("password")}
            className="field"
          />

          <Button className="button" type="submit" variant="contained">
            {formType === "login" ? "Login" : "Signup"}
          </Button>
        </form>

        <Typography
          className="formMessage"
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
