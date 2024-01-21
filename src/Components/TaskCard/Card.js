import React from "react";
import "../Home/Home.css";
import todoApi from "../../todoApi";
import { useNavigate, useParams } from "react-router-dom";


const Card = ({task_name, id ,fetchData, data}) => {
  

  const navigate = useNavigate();
  const {param} = useParams();

//  console.log("task",task_name);
  console.log(id);


  const viewCardData = async(id) =>{
    debugger
    console.log(id)
    try {
      const response = await todoApi.viewDataById(id);
      console.log(response, "view data");
      let param = response.id;
      let data = response;
      navigate(`/todoDetail/${id}`,{state: { mydata: data,
      type: "complete"},})
    } catch (error) {
      console.log("error", error)
    }
  }


  const  editData = async(id) =>{
    debugger
    
    try {
      const response = await todoApi.viewDataById(id);
      console.log("editdata", response);
      let data = response;
      navigate("/editTask",{state : {mydata: data}})
    } catch (error) {
      console.log("error", error);
    }
  }
 

  const deleteData = async(id) =>{
    debugger
    try {
      const response =  await todoApi.deleteDataById(id);
      console.log("deleted",response);
      fetchData();
    } catch (error) {
      console.log("error",error)
    }
  }

   const markData = async(id) =>{
    try {
       const response = await todoApi.markDoneById(id);
       console.log("markdtaa", response);
    } catch (error) {
      console.log("error",error)
    }
   }


  //  const recoverData = async(id) =>{
  //     try {
  //       const response = await todoApi.recoverDataById(id);
  //       console.log("recover Data", response);
  //     fetchData();
  //     } catch (error) {
  //       console.log("error",error);
  //     }
  //  }


  return (
    <>
      <div className="task-card  p-3 m-1 my-3 ">
        <div className="card-heading">
          <h3 className="text-warning">{task_name}</h3>
          
        </div>
        <div className="task-card-body my-3">
          <p>hbgjb,kjbkjbihvjbhjv</p>
        </div>
        <div className="task-card-footer d-flex justify-content-between">
          <div className="mark-btn">
            <button type="button" className="btn btn-outline-success " onClick={() => markData(id)}>
              Mark Done
            </button>
          </div>
          <div className="btn-icons d-flex gap-3 align-items-center">
            <div className="button" onClick={() => viewCardData(id)} >
              <i className="bi bi-eye-fill fs-4 text-warning"></i>
            </div>
            <div className="button"  onClick={() =>editData(id)}>
              <i className="bi bi-pencil-square fs-4 text-warning"></i>
            </div>
            <div className="button"  onClick={() => deleteData(id)}>
              <i className="bi bi-trash3-fill fs-4 text-warning"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
