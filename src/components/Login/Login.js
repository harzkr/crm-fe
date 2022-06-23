import React from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import "./styles.css";

const Login = ({mutate, generalError}) => {
  const [formType, setFormType] = React.useState("login");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    mutate(data);
  };

  return (
    <div className="outerForm">
      <div className="formContainer">
        <Typography variant="h2" className="pageTitle">
            CRM DEMO
        </Typography>
        <Typography className="formError">
          {generalError && <span className="error">{generalError}</span>}
        </Typography>
        <Typography className="formError">
          {errors.name && <span className="error">{errors.name.message}</span>}
        </Typography>
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
                required: {
                  value: true,
                  message: "Name field cannot be empty",
                },
              })}
              style={{
                marginTop: 10,
                marginBottom: 10,
              }}
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
            style={{
              marginTop: 10,
              marginBottom: 10,
            }}
          />
          <TextField
            id="password"
            label="Password"
            variant="filled"
            {...register("password", {
              minLength: {
                value: 8,
                message: "Password must be a minimum of 8 characters",
              },
              required: {
                value: true,
                message: "Password field cannot be empty",
              },
            })}
            style={{
              marginTop: 10,
              marginBottom: 10,
            }}
          />

          <Button
            style={{
              marginTop: 10,
              marginBottom: 10,
            }}
            type="submit"
            variant="contained"
          >
            {formType === "login" ? "Login" : "Signup"}
          </Button>
        </form>

        <Button
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
        </Button>
      </div>
    </div>
  );
};

export default Login;
