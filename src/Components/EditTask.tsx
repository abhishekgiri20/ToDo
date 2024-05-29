import React, { useState } from "react";
import "../Components/addTask/AddTask.css";
import { useLocation, useNavigate } from "react-router-dom";
import todoApi from "../todoApi";
import moment from "moment";
import { Spin } from "antd";
import { ToastContainer, toast } from "react-toastify";
const EditTask = () => {
  const location = useLocation();
  const receiveData = location?.state?.myData;
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [date, setDate] = useState(receiveData?.date);
  const [taskName, setTaskName] = useState<string>(receiveData?.task_name);
  const [description, setDescription] = useState<string>(
    receiveData?.description
  );
  const[tasknameError, setTasknameError] = useState(false)
  const[dateError, setdateError] = useState(false);
  const[discriptionError, setDiscriptionError] = useState(false);



  const convertedDate = new Date(date); 
  const milliseconds = convertedDate.getTime();
 
  const handleChanges = async () => {
    if(taskName === "")return setTasknameError(true);
    if(date === "")return setdateError(true);
    if(description === "")return setDiscriptionError(true);
     setLoading(true)
    try {
      let data = {
        task_name: taskName,
        date: milliseconds,
        description: description,
        id: receiveData?._id,
      };

      const postData = await todoApi.editDataById(data);
      console.log("postData", postData);
      notify("Task Edit Successfuly");
      navigate("/inprogress");
    } catch (error) {
      console.log("error", error);
    }finally{
      setLoading(false);
    }
  
  };

  const notify = (text:string) =>{
    toast.success(`${text}`, {
      position: "top-center",
      autoClose: 1000,
    })
    
  }
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
    <>
    <section className="mt-3 ">
    <Spin spinning={loading}>
        <div className="container">
          <div className="row">
            <div className="form-conatiner p-3 col-md-12 h-100  w-50">
              <form>
                <div className="form-heading mb-5">
                  <h1 className="text-warning">Edit Task</h1>
                </div>

                <div className="task-name d-flex flex-column ">
                  <label htmlFor="input" className="fs-5 mt-2">
                    Task Name
                  </label>
                  <input
                    type="text"
                    id="input"
                    value={taskName}
                    placeholder="Enter task name"
                    className="rounded-5"
                    onChange={handleTaskName}
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
                    name="date"
                    id="date"
                    value={moment(date).format("YYYY-MM-DD")}
                    className="rounded-5 px-2"
                    placeholder="Select date"
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
                  ></textarea>
                  {
                  discriptionError && <span className="text-danger">Please enter discription</span>
                  }
                </div>
                <div className="submitt-btn">
                  <button
                    type="button"
                    className="btn btn-warning mt-3 fs-4 text-white
                "
                    onClick={handleChanges}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </Spin>
      </section>
  
    </>
  );
};

export default EditTask;
