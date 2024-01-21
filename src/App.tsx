import React from "react";
import "./App.css";
import Home from "./Components/Home/Home";
import AddTask from "./Components/AddTask/AddTask";
import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import Viewpage from "./Viewpage";
import EditTask from "./Components/EditTask";
// import Card from "./Components/TaskCard/Card";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="inprogress" element={<Home/>} />
          <Route path="complete" element={<Home/>} />
          <Route path="delete" element={<Home/>} />
        </Route>
        
        <Route path="addTask"element = {<AddTask/>}/>
        <Route path="editTask" element = {<EditTask/>}/>
        <Route path= "todoDetail/:id" element ={<Viewpage/>}/>

      </Routes>
      
    </>
  );
}

export default App;
