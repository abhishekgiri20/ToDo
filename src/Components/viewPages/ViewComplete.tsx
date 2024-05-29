import React from "react";
import todoApi from "../../todoApi";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
const ViewComplete = () => {

  
  const navigate = useNavigate();
  const location = useLocation();

  const receivedData = location.state.mydata;
  const receive = location.state.type;

  const handleDeleteData = async () => {
    debugger
    console.log(receivedData.id)
    try {
      const response = await todoApi.deleteDataById(receivedData?._id);
      navigate("/complete")
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
                <p className="m-0 text-bold fs-5">
                  Task Date&#58; {moment(receivedData.date).format("DD-MM-YYYY")}
                </p>
              </div>
              <div className="text mt-5">
                <p className="fs-4 text-secondary">
                  {receivedData.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
     

    {/* delete modal */}
       
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

export default ViewComplete;
