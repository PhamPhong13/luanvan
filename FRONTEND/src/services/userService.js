import axios from "../axios";

// function handle login
const handleLoginApi = (email, password) => {
  return axios.post("api/login", { email, password }); // request len server
};

// get all code
const getAllcode = (inputData) => {
  return axios.get(`/api/get-allcode?type=${inputData}`);
};

// ---------------------- admin -------------------

const getAllAdmin = () => {
  return axios.get(`/api/get-admin`);
};


export {
  handleLoginApi,   getAllcode,

  /* admin */
  getAllAdmin,
  
};
