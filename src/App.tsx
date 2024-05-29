import React from "react";
import "./App.css";
import Home from "./Components/home/Home";
import AddTask from "./Components/addTask/AddTask";
import Header from "./Header";
import { Routes, Route, Navigate, Router } from "react-router-dom";
import Viewpage from "./Components/viewPages/ViewProgress";
import EditTask from "./Components/EditTask";
import ViewDelete from "./Components/viewPages/ViewDelete";
import ViewComplete from "./Components/viewPages/ViewComplete";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Redirect root path to /inprogress */}
        <Route path="/" element={<Navigate to="/inprogress" />} />
        
        <Route path="/inprogress" element={<Home />} />
        <Route path="/complete" element={<Home />} />
        <Route path="/delete" element={<Home />} />

        <Route path="/addTask" element={<AddTask />} />
        <Route path="/editTask" element={<EditTask />} />
        <Route path="/inprogress/todoDetail/:id" element={<Viewpage />} />
        <Route path="/complete/todoDetail/:id" element={<ViewComplete />} />
        <Route path="/delete/todoDetail/:id" element={<ViewDelete />} />

        {/* Optional: Handle unknown routes */}
        <Route path="*" element={<Navigate to="/inprogress" />} />
      </Routes> 

      <ToastContainer autoClose={1000} />
    </>
  );
}

export default App;
