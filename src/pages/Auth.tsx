/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../features/authSlice";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../services/authApi";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [
    loginUser,
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginUserMutation();

  const [
    registerUser,
    {
      data: registerData,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: registerError,
    },
  ] = useRegisterUserMutation();

  const { firstName, lastName, email, password, confirmPassword } = formValue;

  //onchange function for form inputs
  const handleChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  //register function
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      return toast.error("Password dont match with each other...");
    }

    if (firstName && lastName && password && email) {
      await registerUser({ firstName, lastName, email, password });
    }
  };

  //login function
  const handleLogin = async () => {
    if (email && password) {
      await loginUser({ email, password });
    } else {
      toast.success("Please fill the all Inputs");
    }
  };

  //success scenerio
  useEffect(() => {
    if (isLoginSuccess) {
      toast.success("User Login Successfully");
      dispatch(
        setUser({ name: loginData.result.name, token: loginData.token })
      );
      navigate("/dashboard");
    }
    
    if (isRegisterSuccess) {
      toast.success("User Register Successfully");
      dispatch(
        setUser({ name: registerData.result.name, token: registerData.token })
      );
      navigate("/dashboard");
    }
  }, [isLoginSuccess, isRegisterSuccess]);

  //error scenerio
  useEffect(() => {
    if (isLoginError) {
      toast.error((loginError as any).data.message);
    }
    
    if (isRegisterSuccess) {
      toast.error((registerError as any).data.message);
    }
  }, [isLoginError, isRegisterError]);

  return (
    <section className="flex h-screen gradient">
      <div className="flex flex-col items-center justify-center w-full max-w-2xl m-auto text-white bg-slate-800 rounded-xl md:w-2/3 lg:w-3/5">
        <div className="flex flex-col items-center mb-10 ">
          <h2 className="pt-12 text-xl tracking-wide uppercase md:text-3xl">
            {!showRegister ? "Login" : "Register"}
          </h2>

          <p className="py-2 text-slate-400">
            {!showRegister
              ? "Please enter your Email & Password"
              : "Please enter User Detail"}
          </p>
        </div>

        {showRegister && (
          <>
            <div className="w-full px-6 py-4">
              <input
                type="text"
                className="w-full p-3 text-black rounded shadow-md outline-none shadow-slate-500"
                value={firstName}
                onChange={handleChange}
                placeholder="First Name"
                name="firstName"
              />
            </div>

            <div className="w-full px-6 py-4">
              <input
                type="text"
                className="w-full p-3 text-black rounded shadow-md outline-none shadow-slate-500"
                value={lastName}
                onChange={handleChange}
                placeholder="Last Name"
                name="lastName"
              />
            </div>
          </>
        )}

        <div className="w-full px-6 py-4">
          <input
            type="email"
            className="w-full p-3 text-black rounded shadow-md outline-none shadow-slate-500"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            name="email"
          />
        </div>

        <div className="w-full px-6 py-4">
          <input
            type="password"
            className="w-full p-3 text-black rounded shadow-md outline-none shadow-slate-500"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            name="password"
          />
        </div>

        {showRegister && (
          <div className="w-full px-6 py-4">
            <input
              type="password"
              className="w-full p-3 text-black rounded shadow-md outline-none shadow-slate-500"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              name="confirmPassword"
            />
          </div>
        )}

        {!showRegister ? (
          <button
            type="button"
            className="px-10 py-2 my-6 uppercase border rounded-lg"
            onClick={() => handleLogin()}
          >
            Login
          </button>
        ) : (
          <button
            type="button"
            className="px-10 py-2 my-6 uppercase border rounded-lg"
            onClick={() => handleRegister()}
          >
            Register
          </button>
        )}

        <div className="pb-12">
          {!showRegister ? (
            <>
              <h5 className="text-lg">Don't have an account?</h5>
              <p
                className="text-lg text-center text-slate-400"
                onClick={() => setShowRegister(true)}
              >
                Sign Up
              </p>
            </>
          ) : (
            <>
              <h5 className="text-lg">Already have an account?</h5>
              <p
                className="text-lg text-center text-slate-400"
                onClick={() => setShowRegister(false)}
              >
                Sign In
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Auth;
