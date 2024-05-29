import React from "react";
import "./Home.css";
import profileImage from "../../Assets/profile.jpg";
import Card from "../taskCard/Card";
import { useState, useEffect } from "react";
import { useLocation, useMatch, useNavigate, useSearchParams } from "react-router-dom";
import todoApi from "../../todoApi";
import { Link } from "react-router-dom";
import { Empty, Spin, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import PaginationLayout from "../PaginationLayout";
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import moment from "moment";
const Home = () => {
  const [state, setState] = useState({
    data: [],
  });
 
  const [loading, setLoading] = useState(false)
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [page, setpage] = useState<number>(1)
  const location = useLocation();
  const[filterType,setFilterType] = useState("");
  const [activeKey, setActiveKey] = useState('IN-PROGRESS');
  const newParam = new URLSearchParams(location.search);
  const match: any = useMatch("/inprogress/:page")
  let limit = 6;
  const postsPerPage = 6;
  const navigate = useNavigate();
  const onChangePagination = (newVal: Number) => {
    console.log(newVal,"newVal")
    setpage(Number(newVal))
    navigate(`${location.pathname}?page=${newVal}`);
   
}
  const fetchCardData = async () => {
    setLoading(true)
    try {
      let response;
      if (location.pathname === "/inprogress") {
        response = await todoApi.getAllData(1, page - 1,
          limit,);
      } else if (location.pathname === "/complete") {
        response = await todoApi.getAllData(2,page - 1,
          limit,);
      } else if (location.pathname === "/delete") {
        response = await todoApi.getAllData(3, page - 1,
          limit,);
      } else {
        return null;
      }

      setState({
        data: response?.data || [],
      });
    } catch (error) {
      console.error("Error fetching data", error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchCardData();
  }, [location.pathname, page]);
 


    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0)).getTime();
    const endOfDay = new Date(now.setHours(23, 59, 59, 999)).getTime();
    const tomorrowStart = startOfDay + 86400000; 
    const tomorrowEnd = endOfDay + 86400000;
    const handleTaskFilter = (type:string) =>{
      setFilterType(type);
      console.log("handleTaskFilter...")

    }
    const items: MenuProps['items'] = [
      {
        label: <span onClick={()=>handleTaskFilter("TODAY")}>Today tasks</span>,
        key: '0',
      },
      {
        label: <span onClick={()=>handleTaskFilter("TOMORROW")}>Tomorrow tasks</span>,
        key: '1',
      },
     
      {
        label:  <span onClick={()=>handleTaskFilter("ALL")}>All tasks</span>,
        key: '3',
      },
    ];
  
  const items1: TabsProps['items'] = [
    {
      key: 'IN-PROGRESS',
      label: 'IN-PROGRESS',
      children: <></>,
    },
    {
      key: 'COMPLETED',
      label: 'COMPLETED',
      children: <></>,
    },
    {
      key: 'DELETED',
      label: 'DELETED',
      children:  <></>,
    },
  ];
 

const onChange = (key: string) => {
  setActiveKey(key)
  if(key === "IN-PROGRESS"){
    handleInprogress()
  }else if(key === "COMPLETED"){
    handleComplete()
  }else handleDelete();
  
  console.log(key,"value");
};


useEffect(()=>{
if(location.pathname === "/inprogress")setActiveKey("IN-PROGRESS");
if(location.pathname === "/complete")setActiveKey("COMPLETED");
if(location.pathname === "/delete")setActiveKey("DELETED");
setFilterType("");
},[location.pathname])

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
                    <p className="fs-5">Jully@gmail.com</p>
                  </div>
                </div>
                <div className="bottom-profile d-flex flex-column gap-3 p-5  ">
                  <Link to="/inprogress">
                    <button
                      type="button"
                      className="border-0  fs-4 bg-color text-start bg-transparent"
                    >
                      <i className="bi bi-house-add-fill mx-3 text-warning fs-3"></i>
                      Home
                    </button>
                  </Link>

                  <Link to="/delete">
                    <button
                      type="button"
                      className="border-0  fs-4 bg-color text-start bg-transparent"
                    >
                      <i className="bi bi-trash3-fill mx-3 text-warning fs-3"></i>
                      Delete Task
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className=" col-md-9 ">
              <div className="task-header d-flex justify-content-between heading ms-2 mt-4 flex-column flex-md-row">
                <button
                  className="btn btn-warning px-4 fs-5 "
                  onClick={() => navigate("/AddTask")}
                >
                  <i className="bi bi-plus-circle-fill pe-2 "></i>
                  Add New Task
                </button>
                <Dropdown className="filter-dropdown bg-warning px-4 py-2 rounded-4 text-bold"  menu={{ items }} trigger={['click']}>
                  <a onClick={(e) => e.preventDefault()}>
                  <Space>
                  Task Filters
                <DownOutlined />
                </Space>
                   </a>
              </Dropdown>
              </div>
              <Tabs className="task-bar" activeKey={activeKey} defaultActiveKey="1" items={items1} onChange={onChange} />

            
              <Spin spinning={loading}>
              <div className=" col-12  mt-2">
                {location.pathname === "/inprogress" && (
                  <div className="row ">
                    {
                      (filterType === "TODAY")?
                      <>
                       <h4>Today Tasks</h4>
                      {(state?.data?.filter((item:any)=>item?.date >= startOfDay && item.date <= endOfDay).length)? state?.data?.filter((item:any)=>item?.date >= startOfDay && item.date <= endOfDay).map((val: any) => {
                        return (
                          <div className="col-4" key={val._id}>
                            <Card
                              task_name={val?.task_name}
                              id={val._id}
                              date={val?.date}
                              description={val.description}
                              fetchData={fetchCardData}
                            />
                          </div>
                        );
                      }):<Empty/>}</>:
                      
                        (filterType === "TOMORROW") ?
                        <>
                         <h4>Tomorrow Tasks</h4>
                        {(state?.data?.filter((item:any)=>item?.date >= tomorrowStart && item.date <= tomorrowEnd).length)?state?.data?.filter((item:any)=>item?.date >= tomorrowStart && item.date <= tomorrowEnd).map((val: any) => {
                          return (
                            <div className="col-4" key={val._id}>
                              <Card
                                task_name={val?.task_name}
                                id={val._id}
                                date={val?.date}
                                description={val.description}
                                fetchData={fetchCardData}
                              />
                            </div>
                          );
                        }):<Empty/>}</>
                        :
                         (filterType === "" || filterType === "ALL" ) &&
                      <>
                       <h4>All Tasks</h4>
                      {state?.data?.map((val: any) => {
                        return (
                          <div className="col-4" key={val._id}>
                            <Card
                              task_name={val?.task_name}
                              id={val._id}
                              date={val?.date}
                              description={val.description}
                              fetchData={fetchCardData}
                            />
                          </div>
                        );
                      })}</>
                    }
                    
                  </div>
                )}

                {location.pathname === "/complete" && (
                  <div className="row  ">
                   
                    {
                      (filterType === "TODAY") ?
                      <>
                       <h4>Today Tasks</h4> 
                      {(state?.data?.filter((item:any)=>item?.date >= startOfDay && item.date <= endOfDay).length)?state?.data?.filter((item:any)=>item?.date >= startOfDay && item.date <= endOfDay).map((val: any) => {
                        return (
                          <div className="col-4" key={val._id}>
                            <Card
                              task_name={val?.task_name}
                              id={val._id}
                              date={val?.date}
                              description={val.description}
                              fetchData={fetchCardData}
                            />
                          </div>
                        );
                      }):<Empty/>}</>:

                      (filterType === "TOMORROW") ?
                      <>
                       <h4>Tomorrow Tasks</h4>
                      {(state?.data?.filter((item:any)=>item?.date >= tomorrowStart && item.date <= tomorrowEnd).length)?state?.data?.filter((item:any)=>item?.date >= tomorrowStart && item.date <= tomorrowEnd).map((val: any) => {
                        return (
                          <div className="col-4" key={val._id}>
                            <Card
                              task_name={val?.task_name}
                              id={val._id}
                              date={val?.date}
                              description={val.description}
                              fetchData={fetchCardData}
                            />
                          </div>
                        );
                      }):<Empty/>}</>
                      :
                      (filterType === "" || filterType === "ALL" ) &&
                      <>
                       <h4>All Tasks</h4>
                      {state?.data?.map((val: any) => {
                        return (
                          <div className="col-4" key={val._id}>
                            <Card
                              task_name={val?.task_name}
                              id={val._id}
                              date={val?.date}
                              description={val.description}
                              fetchData={fetchCardData}
                            />
                          </div>
                        );
                      })}</>
                    }

                  </div>
                )}

                {location.pathname === "/delete" && (
                  <div className="row  ">
                   
                  {
                    (filterType === "TODAY") ?
                    <>
                     <h4>Today Tasks</h4>
                    {(state?.data?.filter((item:any)=>item?.date >= startOfDay && item.date <= endOfDay).length)?state?.data?.filter((item:any)=>item?.date >= startOfDay && item.date <= endOfDay).map((val: any) => {
                      return (
                        <div className="col-4" key={val._id}>
                          <Card
                            task_name={val?.task_name}
                            id={val._id}
                            date={val?.date}
                            description={val.description}
                            fetchData={fetchCardData}
                          />
                        </div>
                      );
                    }):<Empty/>}</>:
                    (filterType === "TOMORROW")?
                    <>
                     <h4>Tomorrow Tasks</h4>
                    {(state?.data?.filter((item:any)=>item?.date >= tomorrowStart && item.date <= tomorrowEnd).length)?state?.data?.filter((item:any)=>item?.date >= tomorrowStart && item.date <= tomorrowEnd).map((val: any) => {
                      return (
                        <div className="col-4" key={val._id}>
                          <Card
                            task_name={val?.task_name}
                            id={val._id}
                            date={val?.date}
                            description={val.description}
                            fetchData={fetchCardData}
                          />
                        </div>
                      );
                    }):<Empty/>}</>:

                    (filterType === "" || filterType === "ALL" ) &&
                    <>
                     <h4>All Tasks</h4>
                    {state?.data?.map((val: any) => {
                      return (
                        <div className="col-4" key={val._id}>
                          <Card
                            task_name={val?.task_name}
                            id={val._id}
                            date={val?.date}
                            description={val.description}
                            fetchData={fetchCardData}
                          />
                        </div>
                      );
                    })}</>
                  }
                </div>
                )}
              </div>
              </Spin>
              <div className='dashboad-pagination-box'>
                <PaginationLayout
                     count={50}
                     data={state?.data}
                     page={page}
                     limit={Number(limit)}
                     loading={loading}
                     onPageChange={(val: any) => onChangePagination(val)}
                    />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;







  

    