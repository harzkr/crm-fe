import React from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import "./styles.css";

const Login = () => {
  const [formType, setFormType] = React.useState("login");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="outerForm">
      <div className="formContainer">
        <Typography className="formError">
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </Typography>
        <Typography className="formError">
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </Typography>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {formType === "signup" && (
            <TextField
              id="name"
              label="Name"
              variant="filled"
              {...register("name", {
                required: true,
              })}
              className="field"
            />
          )}
          <TextField
            id="email"
            label="Email"
            variant="filled"
            {...register("email", {
              required: {
                value: true,
                message: "Email field cannot be empty",
              },
            })}
            className="field"
          />
          <TextField
            id="password"
            label="Password"
            variant="filled"
            {...register("password", {
              minLength: {
                value: 8,
                message: "must be 8 chars",
              },
              required: {
                value: true,
                message: "Password field cannot be empty",
              },
            })}
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
