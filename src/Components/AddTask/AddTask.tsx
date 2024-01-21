import React, { useState } from "react";
import "./AddTask.css";
import todoApi from "../../todoApi";
import { useNavigate } from "react-router-dom";
const AddTask = () => {
  const [date, setDate] = useState("");
  const [taskName, setTaskName] = useState("");
  const [discription, setDiscription] = useState("");
  const navigate = useNavigate();



  const formDataHandler = async(event:any) => {
   
    event.preventDefault();
    const data = {
      date: date,
      task_name: taskName,
      task: discription,
    };
    try {
      const postData = await todoApi.addTask(data);
      console.log("postData",postData);
      navigate("/inprogress");
    } catch (error) {
      console.log("Error in postData", error)
    }      
    

    setDate("");
    setTaskName("");
    setDiscription("");
    console.log(data);
  };
  return (
    <section className="mt-3 ">
      <div className="container">
        <div className="row">
          <div className="form-conatiner p-3 col-md-12 h-100  w-50">
            <form onSubmit={formDataHandler}>
              <div className="form-heading mb-5">
                <h1 className="text-warning">Add New Task</h1>
              </div>

              <div className="task-name d-flex flex-column ">
                <label htmlFor="input" className="fs-5 mt-2">
                  Task Name
                </label>
                <input
                  type="text"
                  id="input"
                  value={taskName}
                  placeholder="Enter  task name"
                  onChange={(e) => setTaskName(e.target.value)}
                />
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
                  className=""
                  placeholder="Select date"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="task-discription d-flex flex-column">
                <label htmlFor="discription" className="fs-5  mt-3">
                  Discription
                </label>
                <textarea
                  name=""
                  id="discription"
                  value={discription}
                  className="fs-5 p-2 rounded-3"
                  cols={30}
                  rows={8}
                  onChange={(e) => setDiscription(e.target.value)}
                >
                  Enter the task description
                </textarea>
              </div>
              <div className="submitt-btn">
                <button
                  type="button"
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
    </section>
  );
};

export default AddTask;
