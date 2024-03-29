import React from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import "./styles.css";

const Login = ({ mutate, mutateRegister, generalError }) => {
  const [formType, setFormType] = React.useState("login");
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (formType === "login") {
      mutate(data);
    } else {
      mutateRegister(data);
    }
  };

  return (
    <div className="outer__form">
      <div className="form__container">
        <Typography variant="h2" className="page__title">
          CRM CHAT DEMO
        </Typography>
        <Typography className="form__error">
          {generalError && <span className="error">{generalError}</span>}
        </Typography>
        <Typography className="form__error">
          {errors.name && <span className="error">{errors.name.message}</span>}
        </Typography>
        <Typography className="form__error">
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </Typography>
        <Typography className="form__error">
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
              className="form__field"
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
            className="form__field"
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
            className="form__field"
          />

          <Button className="form__button" type="submit" variant="contained">
            {formType === "login" ? "Login" : "Signup"}
          </Button>
        </form>

        <Button
          className="form__message"
          onClick={
            formType === "login"
              ? () => {
                  setFormType("signup");
                  reset();
                  clearErrors();
                }
              : () => {
                  setFormType("login");
                  reset();
                  clearErrors();
                }
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
