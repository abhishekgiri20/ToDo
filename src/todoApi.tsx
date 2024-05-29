import request from "superagent";



const api_url = "http://139.59.47.49:4000/";


// getData api

const getAllData = async (status:any,pagination:number,limit:number) => {
  try {
    const response = await request.get(
      `${api_url}task?get=${status}&pagination=${pagination}&limit=${limit}`
    );
    return response.body;
  } catch (error) {
    console.log("Error", error);
  } 
};



//view data api
const viewDataById = async (id:any) => {
  try {
    const response = await request.get(`${api_url}task/${id}`);
    return response.body;
  } catch (error) {
    console.log("error",error);
  }
};


//editdata api
const editDataById = async (data:object) => {
  debugger
  try {
    const response = await request.put(`${api_url}task`).send(data);
    return response.body;
  } catch (error) {
    console.log("error",error);
  }
};


//mark done api
const markDoneById = async(id:number) =>{
 
  try {
    const response = await request.put(`${api_url}task/complete/${id}`);
    return response.body;
  } catch (error) {
    console.log("Error in markdone ", error);
  }
}


//recover
const recoverDataById = async(id:any) => {
 
  try {
    const response = await request.put(`${api_url}task/recover/${id}`);
      return response.body;
  } catch (error) {
      console.log('PUT Request Error:', error);
  }
};


//recover
const addTask = async (postData: object) => {
  try {
      const response = await request.post(`${api_url}task`).send(postData);
      return response.body;
  } catch (error) {
      console.log("Error in adding task",error)
  }
};


// delete data
const deleteDataById = async (id: number) => {
 debugger
  try {
      const response = await request.delete(`${api_url}task/${id}`);
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
