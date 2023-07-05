import { useAppContext } from "./context/appContext";
import { Signup, Error, Home, EditUserInfo } from "./pages";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signin from "./pages/Signin";
// import { useState } from "react";

export default function App() {
  const { user } = useAppContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route
          path="/signup"
          // element={<Signup />}
          element={
            localStorage.getItem("user") === null ? (
              <Signup />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/signin"
          // element={<Signin />}
          element={
            localStorage.getItem("user") === null ? (
              <Signin />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route path="*" element={<Error />} />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/signin" />}
        />
        <Route
          path="/editUser"
          element={user ? <EditUserInfo /> : <Navigate to="/signin" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
