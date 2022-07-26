import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  const { firstName, lastName, email, password, confirmPassword } = formValue;

  const handleChange = () => {};

  return (
    <section className="h-screen flex gradient">
      <div className="m-auto h-1/2 md:h-3/5 bg-slate-800 rounded-xl text-white w-full md:w-2/3 lg:w-3/5 max-w-2xl flex flex-col justify-center items-center">
        <div className=" mb-10 flex flex-col items-center">
          <h2 className="uppercase text-xl md:text-3xl tracking-wide">
            {!showRegister ? "Login" : "Register"}
          </h2>

          <p className="py-2 text-slate-400">
            {!showRegister
              ? "Please enter your Email & Password"
              : "Please enter User Detail"}
          </p>
        </div>

        <div className="w-full px-6 py-4">
          <input
            type="email"
            className="outline-none p-3 w-full rounded shadow-slate-500 shadow-md"
            value={email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>

        <div className="w-full px-6 py-4">
          <input
            type="password"
            className="outline-none p-3 w-full rounded shadow-slate-500 shadow-md"
            value={password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>

        {!showRegister ? (
          <button
            type="button"
            className="border py-2 px-10 uppercase my-6 rounded-lg"
          >
            Login
          </button>
        ) : (
          <button
            type="button"
            className="border py-2 px-10 uppercase my-6 rounded-lg"
          >
            Register
          </button>
        )}

        <div>
          {!showRegister ? (
            <>
              <h5 className="text-lg">Don't have an account?</h5>
              <p
                className="text-slate-400 text-lg text-center"
                onClick={() => setShowRegister(true)}
              >
                Sign Up
              </p>
            </>
          ) : (
            <>
              <h5 className="text-lg">Already have an account?</h5>
              <p
                className="text-slate-400 text-lg text-center"
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
