import React from "react";
import todoApi from "./todoApi";
import { useLocation, useNavigate } from "react-router-dom";
const Viewpage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const receivedData = location.state.mydata;
  const receive = location.state.type;

  
  console.log(receive, "type1234");
  console.log(receivedData, "show data ");

  const handleMarkDone = async () => {
    try {
      const response = await todoApi.markDoneById(receivedData.id);
      console.log(response, "markdata");
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await todoApi.viewDataById(receivedData?.id);
      console.log("edditdata", response);
      let data = response;
      navigate("/editTask", { state: { myData: data } });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDeleteData = async () => {
    try {
      const response = await todoApi.deleteDataById(receivedData?.id);
      console.log("delete", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <section className="mt-5 ">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-heading d-flex justify-content-between align-items-center">
                <h2 className="m-0">{receivedData.task_name}</h2>
                <div className="header-btns d-flex gap-3 ">
                  <button
                    className="btn btn-outline-warning px-4 py-2 fs-4"
                    onClick={handleMarkDone}
                  >
                    Mark Done
                  </button>
                  <button
                    className="btn btn-warning px-4 py-2 fs-4 text-white"
                    onClick={handleEdit}
                  >
                    <span className="me-3">
                      <i className="bi bi-pencil-fill"></i>
                    </span>
                    Edit Task
                  </button>
                  <button
                    className="btn btn-danger fs-4 px-4 py-2"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    <span className="me-3">
                      <i className="bi bi-trash3-fill"></i>
                    </span>
                    Delete
                  </button>
                </div>
              </div>
              <div className="date mt-3">
                <p className="m-0 text-bold fs-5">Task Date&#58; 21/01/23</p>
              </div>
              <div className="text mt-5">
                <p className="fs-4 text-secondary">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Corrupti, blanditiis deserunt omnis nemo ab hic accusantium
                  debitis quos placeat quae.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>






      {/* Delete modal */}


      <div
        className="modal fade "
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered p-4">
          <div className="modal-content">
            <div className="delete-header  text-center py-2 postion-relative">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Delete Task
              </h1>
            </div>
            <div className="icon position-absolute top-0 end-0 p-2 pe-3">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              <p className="fs-5 m-0">
                Are you sure you want to delete this task?
              </p>
            </div>
            <div className="modal-footer justify-content-center gap-4 border-0">
              <button
                type="button"
                className="btn btn-outline-warning px-4 py-2"
                data-bs-dismiss="modal"
                onClick={handleDeleteData}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-warning px-4 py-2"
                data-bs-dismiss="modal"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



export default Viewpage;
