import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout, selectAuth } from "../features/authSlice";

const Dashboard = () => {
  const { name } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const handleLogout = () => {
    dispatch(logout())
    toast.success("User logged out...");
    navigate("/auth")
  }

  return (
    <div className="flex h-screen gradient">
      <div className="flex flex-col items-center justify-center w-full max-w-2xl m-auto text-white bg-slate-800 rounded-xl md:w-2/3 lg:w-3/5">
        <div className="flex flex-col items-center mb-10 ">
          <h2 className="pt-12 text-2xl font-bold tracking-wide md:text-5xl">
            Welcome to Dashboard
          </h2>

          <h4 className="py-6 text-lg md:text-2xl">Name: {name}</h4>

          <button
            type="button"
            onClick={() => handleLogout()}
            className="px-10 py-2 my-6 uppercase border rounded-lg outline-none"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
