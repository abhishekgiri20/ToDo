import React, { useState } from "react";
import "./AddTask.css";
import todoApi from "../../todoApi";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import { ToastContainer, toast } from "react-toastify";
const AddTask = () => {
  const [date, setDate] = useState("");
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const[tasknameError, setTasknameError] = useState(false)
  const[dateError, setdateError] = useState(false);
  const[discriptionError, setDiscriptionError] = useState(false);
   const navigate = useNavigate();
  let myMoment = moment(date,'YYYY-MM-DD');
  let milliseconds = myMoment.valueOf();
 
  const notify = (text:string) =>
    toast.success(`${text}`, {
      position: "top-center",
      autoClose: 1000, 
    });

  const formDataHandler = async(event:any) => {
    debugger
    event.preventDefault();
    if(taskName === "")return setTasknameError(true);
    if(date === "")return setdateError(true);
    if(description === "")return setDiscriptionError(true);
    try {
      const taskData = {
        task_name: taskName,
        date: milliseconds,
        description: description,
      };
      const postData = await todoApi.addTask(taskData);
      console.log("postData",postData);
      notify("Task Added Successfuly");
      navigate("/inprogress");
    } catch (error) {
      console.log("Error in postData", error)
    }      
    

  };
  const handleTaskName = (e:any) =>{
    if(e.target.value === ""){
      setTasknameError(true);
    }else{
      setTasknameError(false);  
     
    }
    setTaskName(e.target.value);
    
  }
  const handleTaskDate = (e:any) =>{
    if(e.target.value === ""){
      setdateError(true)
    }else setdateError(false)
   setDate(e.target.value)
  }
  const handleTaskDiscrioption = (e:any) => {
    if(e.target.value === ""){
      setDiscriptionError(true)
    }else setDiscriptionError(false)
    setDescription(e.target.value)
  }
  return (
    <section className="mt-3 ">
      <div className="container">
        <div className="row">
          <div className="form-conatiner p-3 col-md-12 h-100  w-50">
            <form onSubmit={formDataHandler}>
              <div className="form-heading mb-5">
                <h1 className="text-warning">Add New Task</h1>
              </div>

              <div className="task-name   d-flex flex-column ">
                <label htmlFor="input" className="fs-5 mt-2">
                  Task Name
                </label>
                <input
                  type="text"
                  id="input"
                  value={taskName}
                  placeholder="Enter task name..."
                  className="rounded-5 px-2"
                  onChange={ handleTaskName}
                  
                />
              {
                tasknameError && <span className="text-danger">Please enter task Name</span>
              }
              </div>

              <div className="task-date d-flex flex-column">
                <label htmlFor="date" className="fs-5  mt-3">
                  Date
                </label>
                <input
                  type="date"
                  name=""
                  id="date"
                  value={date}
                  placeholder="Select date"
                  className="rounded-5 px-2"
                  onChange={handleTaskDate}
                 
                />
                {
                  dateError && <span className="text-danger">Please enter date</span>
                }
              </div>

              <div className="task-discription d-flex flex-column">
                <label htmlFor="discription" className="fs-5  mt-3">
                  Discription
                </label>
                <textarea
                  name=""
                  id="discription"
                  value={description}
                  className="fs-5 p-2 rounded-3"
                  cols={30}
                  rows={8}
                  onChange={handleTaskDiscrioption}
                  
                  placeholder="Enter task discription..."
                >
                  Enter the task description
                </textarea>
                {
                  discriptionError && <span className="text-danger">Please enter discription</span>
                }
              </div>
              <div className="submitt-btn">
                <button
                  type="submit"
                  className="btn btn-warning mt-3 fs-4 text-white
                "
                >
                  Add Task
                </button>
               
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </section>
  );
};

export default AddTask;
