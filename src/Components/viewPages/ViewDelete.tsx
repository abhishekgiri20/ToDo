import React from 'react'
import todoApi from '../../todoApi';
import { useLocation, useNavigate } from "react-router-dom";
import moment from 'moment';

const ViewDelete = () => {



  const navigate = useNavigate();
  const location = useLocation();

  const receivedData = location.state.mydata;
  const receive = location.state.type;




  const recoverData = async() =>{
   debugger
    try {
      const response = await todoApi.recoverDataById(receivedData._id);
      console.log("recover Data", response);
      navigate("/delete")

    } catch (error) {
      console.log("error",error);
    }
 }


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
              className="btn btn-outline-success px-4 py-2 fs-4 "
              onClick={recoverData}
            >
             
              Recover
            </button>
       
          </div>
        </div>
        <div className="date mt-3">
          <p className="m-0 text-bold fs-5">Task Date&#58; {moment(receivedData.date).format("DD-MM-YYYY")}</p>
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
</>
  )
}

export default ViewDelete