import axios from "../axios";

// function handle login
const handleLoginApi = (email, password) => {
  return axios.post("api/login", { email, password }); // request len server
};

// get all code
const getAllcode = (inputData) => {
  return axios.get(`/api/get-allcode?type=${inputData}`);
};

// ---------------------- patient -------------------

const getAllPatient = () => {
  return axios.get(`/api/get-patient`);
};

const createPatient = (inputData) => {
  return axios.post(`/api/create-patient`, inputData);
};

const deletePatient = (id) => {
  return axios.delete(`api/delete-patient`, {
    data: { id: id },
  });
};

const getPatientById = (id) => {
  return axios.get(`/api/get-patient`, {
    data: { id: id },
  });
};

const updatePatient = (data) => {
  return axios.put(`/api/update-patient`, data);
};

// ---------------------- admin -------------------

const getAllAdmin = () => {
  return axios.get(`/api/get-admin`);
};

// ---------------------- doctor -------------------

const getAllDoctor = () => {
  return axios.get(`/api/get-doctor`);
};
const createDoctor = (data) => {
  return axios.post(`/api/create-doctor`, data);
};

export {
  handleLoginApi,
  getAllcode,

  /* patient */
  getAllPatient,
  createPatient,
  deletePatient,
  getPatientById,
  updatePatient,

  /* admin */
  getAllAdmin,
  /* doctor */
  getAllDoctor,
  createDoctor,
};
