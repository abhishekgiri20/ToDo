import React from "react";
import "./Card.css";
import todoApi from "../../todoApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Grid } from "antd";

const Card = ({ task_name, id, description, fetchData }: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const screens = Grid.useBreakpoint()
  const viewCardData = async (id: any) => {
    try {
      if (location.pathname === "/inprogress") {
        const response = await todoApi.viewDataById(id);
        console.log(response, "view data");
        let data = response;
        navigate(`/inprogress/todoDetail/${id}`, {
          state: { mydata: data, type: "inprogress" },
        });
      } else if (location.pathname === "/delete") {
        const response = await todoApi.viewDataById(id);
        console.log(response, "view data");
        let data = response;
        navigate(`/delete/todoDetail/${id}`, {
          state: { mydata: data, type: "delete" },
        });
      } else if (location.pathname === "/complete") {
        const response = await todoApi.viewDataById(id);
        console.log(response, "view data");
        let data = response;
        navigate(`/complete/todoDetail/${id}`, {
          state: { mydata: data, type: "complete" },
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  //EDIT TASK

  const editData = async (id: any) => {
    try {
      const response = await todoApi.viewDataById(id);
      console.log("editdata", response);
      let data = response;
      navigate("/editTask", { state: { myData: data } });
    } catch (error) {
      console.log("error", error);
    }
  };

  const notify = (text:string) =>
    toast.success(`${text}`, {
      position: "top-center",
      autoClose: 1000,
    });



  //delete task
  const deleteData = async (id: any) => {
    debugger;
    console.log("delete id", id);
    try {
      const response = await todoApi.deleteDataById(id);
      console.log("deleted", response);
      notify("Task Deleted Successfully");
      fetchData();
    } catch (error) {
      console.log("error", error);
      toast?.error("Error while deleting");
    }
  };



  const markData = async (id: any) => {
    try {
      const response = await todoApi.markDoneById(id);
      console.log("markdtaa", response);
      notify("Mark Done Successfully");
      fetchData();
    } catch (error) {
      console.log("error", error);
    }
  };

  const recoverData = async (id: any) => {
    try {
      const response = await todoApi.recoverDataById(id);
      console.log("recover Data", response);
      
      notify("Task Recovered Successfully");
      fetchData();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div className="task-card  p-3 m-1 my-3  ">
        <div className="card-heading">
          <h3 className="text-warning text-truncate">{task_name}</h3>
        </div>
        <div className="task-card-body my-3 ">
          <p className="text-truncate">{description}</p>
        </div>

        <div className="div">
          {location.pathname === "/inprogress" && (
            <div className="task-card-footer d-flex justify-content-between">
              <div className="mark-btn ">
                <Button
                  type="primary"
                  ghost
                  size={screens.sm? "large":"small"}
                  // className="btn btn-outline-success  "
                  onClick={() => markData(id)}
                >
                  Mark Done
                </Button>
              </div>
              <div className="btn-icons d-flex gap-3 align-items-center">
                <div className="button" onClick={() => viewCardData(id)}>
                  <i className="bi bi-eye-fill fs-5 p-1  text-warning border border-warning rounded-circle "></i>
                </div>
                <div className="button" onClick={() => editData(id)}>
                  <i className="bi bi-pencil-fill fs-5 p-1  text-warning border border-warning rounded-circle"></i>
                </div>
                <div className="button" onClick={() => deleteData(id)}>
                  <i className="bi bi-trash3-fill fs-5 p-1 text-danger border border-danger rounded-circle"></i>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="div">
          {location.pathname === "/complete" && (
            <div className="task-card-footer d-flex justify-content-end">
              <div className="btn-icons d-flex gap-3 align-items-center">
                <div className="button" onClick={() => viewCardData(id)}>
                  <i className="bi bi-eye-fill fs-5 p-1  text-warning border border-warning rounded-circle "></i>
                </div>
                <div className="button" onClick={() => deleteData(id)}>
                  <i className="bi bi-trash3-fill fs-5 p-1 text-danger border border-danger rounded-circle"></i>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="div">
          {location.pathname === "/delete" && (
            <div className="task-card-footer d-flex justify-content-between">
              <div className="mark-btn">
                <button
                  type="button"
                  className="btn btn-outline-success "
                  onClick={() => recoverData(id)}
                >
                  Recover
                </button>
              </div>
              <div className="btn-icons d-flex gap-3 align-items-center">
                <div className="button" onClick={() => viewCardData(id)}>
                  <i className="bi bi-eye-fill fs-5 p-1  text-warning border border-warning rounded-circle "></i>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
    </>
  );
};

export default Card;
