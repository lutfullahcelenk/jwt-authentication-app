import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "./app/hooks";
import { setUser } from "./features/authSlice";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

function App() {
  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  console.log("user", user);

  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {/* <ToastContainer position="bottom-right" /> */}
        <Routes>
          <Route path="/" element={<Navigate to="auth" replace />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
