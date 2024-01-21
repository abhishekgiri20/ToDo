import React from "react";
import "./Home.css";
import profileImage from "../../Assets/profile.jpg";
import Card from "../TaskCard/Card";
import { useState, useEffect } from "react";
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import todoApi from "../../todoApi";
// import { stat } from "fs/promises";

const Home = () => {

  const [state, setState] = useState({
    rows: [],
    total_records: 0,
  }
  );


  const navigate = useNavigate();
  const location = useLocation();
  const {param} = useParams();



  // const fetchCardData = async () => {
  //   try {
  //     if (location.pathname === "/inprogress") {
  //       const response = await todoApi.getAllData("1");
  //     } else if (location.pathname === "/complete") {
  //       const response = await todoApi.getAllData("2");
  //     } else if (location.pathname === "/delete") {
  //       const response = await todoApi.getAllData("0");
  //     } else {
  //       return null;
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  
  const fetchCardData = async () => {
    try {
      let response;
      if (location.pathname === "/inprogress") {
        response = await todoApi.getAllData(1);
      } else if (location.pathname === "/complete") {
        response = await todoApi.getAllData(2);
      } else if (location.pathname === "/delete") {
        response = await todoApi.getAllData(0);
      } else {
        return null;
      }
      console.log(response);
      setState({
        rows: response?.rows || [],
        total_records: response?.total_records || 0,
      });
    
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  console.log(state);

  useEffect(() => {
    fetchCardData();
  }, [location.pathname]);


  const handleAddTask = () => navigate("AddTask");
  const handleInprogress = () => navigate("/inprogress");
  const handleComplete = () => navigate("/complete");
  const handleDelete = () => navigate("/delete");

  return (
    <>
      <section className="mt-3">
        <div className="container-fluid">
          <div className="row">
            <div className=" col-md-3 ">
              <div className="sidebar-profile ">
                <div className="top-profile mt-1">
                  <div className="profile-image mt-3 ">
                    <img src={profileImage} alt="girl" />
                  </div>
                  <div className="profile-name mt-2 text-secondary">
                    <h2>Jully Ellis</h2>
                  </div>
                  <div className="profile-email mt-3">
                    <p className="fs-5">Jully9999@gmail.com</p>
                  </div>
                </div>
                <div className="bottom-profile d-flex flex-column gap-3 p-5 ms-4 ">
                  <button
                    type="button"
                    className="border-0  fs-4 bg-color text-start bg-transparent"
                  >
                    <i className="bi bi-house-add-fill mx-3 text-warning fs-3"></i>
                    Home
                  </button>
                  <button
                    type="button"
                    className="border-0  fs-4 bg-color text-start bg-transparent"
                  >
                    <i className="bi bi-trash3-fill mx-3 text-warning fs-3"></i>
                    Delete Task
                  </button>
                </div>
              </div>
            </div>

            <div className=" col-md-9 ">
              <div className="task-header d-flex justify-content-between heading ms-2 mt-4 flex-column flex-md-row">
                <h2>Tasks</h2>
                <button
                  className="btn btn-warning w-25 fs-5 "
                  onClick={handleAddTask}
                >
                  <i className="bi bi-plus-circle-fill pe-2 "></i>
                  Add New Task
                </button>
              </div>

              <div className=" col-md-12 mt-5">
                <div className="row ">
                  <div className="col-4">
                    <div className="task-buttons text-center">
                      <button
                        type="button"
                        className="btn btn-warning w-75"
                        onClick={handleInprogress}
                      >
                        IN-PROGRESS
                      </button>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="task-buttons text-center">
                      <button
                        type="button"
                        className="btn btn-warning  w-75"
                        onClick={handleComplete}
                      >
                        COMPLETED
                      </button>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="task-buttons text-center">
                      <button
                        type="button"
                        className="btn btn-warning  w-75"
                        onClick={handleDelete}
                      >
                        DELETED
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" col-12  mt-5">
                {
                  location.pathname === "/inprogress" && (
                  <div className="row ">
                    {state.rows.map((val) => {
                      return (
                        <div className="col-4 " key={val.task_name}>
                          <Card
                            task_name={val?.task_name}
                            id={val.id}
                            date = {val?.date}
                            fetchData={fetchCardData}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}

                {location.pathname === "/complete" && (
                  <div className="row  ">
                    {state.rows.map((val) => {
                      return (
                        <div className="col-4" key={val.task_name}>
                          <Card
                            task_name={val?.task_name}
                            id={val.id}
                            fetchData={fetchCardData}
                            data = {state}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}


                
                {location.pathname === "/delete" && (
                  <div className="row  ">
                    {state?.rows?.map((val) => {
                      return (
                        <div className="col-4" key={val.task_name}>
                          <Card
                            task_name={val?.task_name}
                            id={val.id}
                            fetchData={fetchCardData}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
