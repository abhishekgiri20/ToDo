import request from "superagent";
const api_url = "http://139.59.47.49:4004/api/";

const getAllData = async (status:any) => {
  try {
    const response = await request.get(
      `${api_url}tasks?limit=6&start=1&status=${status}`
    );
    return response.body;
  } catch (error) {
    console.log("Error", error);
  }
};




const viewDataById = async (id:any) => {
  try {
    const response = await request.get(`${api_url}task/{id}?id=${id}`);
    return response.body;
  } catch (error) {
    console.log("error",error);
  }
};



const editDataById = async (data:any) => {
  debugger
  try {
    const response = await request.put(`${api_url}task`).send(data);
    return response.body;
  } catch (error) {
    console.log("error",error);
  }
};



const markDoneById = async(id:number) =>{
  try {
    const response = await request.put(`${api_url}task/complete/${id}`);
    return response.body;
  } catch (error) {
    console.log("Error in markdone ", error);
  }
}



const recoverDataById = async (_id: any) => {
  try {
      const response = await request.put(`${api_url}task/recover/${_id}`);
      return response.body;
  } catch (error) {
      console.log('PUT Request Error:', error);
  }
};



const addTask = async (data: object) => {
  try {
      const response = await request.post(`${api_url}task`).send(data);
      return response.body;
  } catch (error) {
      console.log("Error in adding task",error)
  }
};


// delete data
const deleteDataById = async (id: number) => {
  const deletedData = {
    id:id,
    status: 0,

  }
  try {
      const response = await request.post(`${api_url}task/status`).send(deletedData);
      return response.body;
  } catch (error) {
      console.log("Error in deleting",error);
  }
}



const todoApi = {
  getAllData,
  viewDataById,
  editDataById,
  markDoneById,
  recoverDataById,
  addTask,
  deleteDataById,
};

export default todoApi;
