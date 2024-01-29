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
  return axios.get(`/api/get-patient-by-id?id=${id}`);
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

const getDoctorById = (id) => {
  return axios.get(`/api/get-doctor-by-id?id=${id}`);
}

const updateDoctor = (data) => {
  return axios.put(`/api/update-doctor`, data);
};

const deleteDoctor = (id) => {
  return axios.delete(`api/delete-doctor`, {
    data: { id: id },
  });
};

const getDoctorInForByDoctorId = (id) => {
  return axios.post(`/api/get-doctorinfor-by-doctor-id`,
  {
    id: id 
  });
};


// ---------------------- clinic -------------------
const createClinic = (data) => {
  return axios.post(`/api/create-clinic`, data);
};

const getClinic = () => {
  return axios.get(`/api/get-clinic`);
};

const deleteClinic = (id) => {
  return axios.delete(`api/delete-clinic`, {
    data: { id: id },
  });
};


export {
  handleLoginApi,   getAllcode,

  /* patient */
  getAllPatient,  createPatient,  deletePatient,  getPatientById,  updatePatient,

  /* admin */
  getAllAdmin,
  /* doctor */
  getAllDoctor,  createDoctor, getDoctorById, updateDoctor, deleteDoctor,
  getDoctorInForByDoctorId,

  /* clinic */
  createClinic,getClinic, deleteClinic
};
