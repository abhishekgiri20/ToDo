import React,{useState} from 'react'
import "../Components/AddTask/AddTask.css";
import { useLocation, useNavigate } from 'react-router-dom';
import todoApi from '../todoApi';
const EditTask = () => {
  

  const location = useLocation();
  const reciveData = location.state.mydata;
  const navigate = useNavigate();
  const [date, setDate] = useState("2024-01-14");
  const [taskName, setTaskName] = useState<string>(reciveData.task_name);
  const [description, setDescription] = useState<string>(reciveData.description);
  const id = reciveData.id;


  const goToTaskPage = async() =>{
    debugger
      try {
        let data ={
          id: id,
          task_name: taskName,
          date: date
          
          // description: description,
        }
        console.log(data)
        const postData =  await todoApi.editDataById(data);
        // console.log("postData", postData);
      } catch (error) {
        console.log("error", error);
      }
  }
  return (
    <>
       <section className="mt-3 ">
      <div className="container">
        <div className="row">
          <div className="form-conatiner p-3 col-md-12 h-100  w-50">
            <form >
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
                  value={description}
                  className="fs-5 p-2 rounded-3"
                  cols={30}
                  rows={8}
                  onChange={(e) => setDescription(e.target.value)}
                >
                  Enter the task description
                </textarea>
              </div>
              <div className="submitt-btn">
                <button
                  type="button"
                  className="btn btn-warning mt-3 fs-4 text-white
                "
                onClick={goToTaskPage}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default EditTask;