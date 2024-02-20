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

const createAdmin = (data) => {
  return axios.post(`/api/create-admin`, data);
}

const deleteAdmin = (id) => {
  return axios.delete(`/api/delete-admin`, {
    data: { id: id }
  })
}

const getAdminById = (id) => {
  return axios.get(`api/get-admin-by-id?id=${id}`);
}

const updateAdmin = (data) => {
  return axios.put(`api/update-admin`, data);
}

// ---------------------- user -------------------

const getAllUser = () => {
  return axios.get(`/api/get-user`);
};

const createUser = (data) => {
  return axios.post(`/api/create-user`, data);
}

const deleteUser = (id) => {
  return axios.delete(`/api/delete-user`, {
    data: { id: id }
  })
}

const getUserById = (id) => {
  return axios.get(`api/get-user-by-id?id=${id}`);
}

const updateUser = (data) => {
  return axios.put(`api/update-user`, data);
}


// ---------------------- cat -------------------

const getAllcat = () => {
  return axios.get(`/api/get-cat`);
};

const createcat = (data) => {
  return axios.post(`/api/create-cat`, data);
}

const deletecat = (id) => {
  return axios.delete(`/api/delete-cat`, {
    data: { id: id }
  })
}

const getcatById = (id) => {
  return axios.get(`api/get-cat-by-id?id=${id}`);
}

const updatecat = (data) => {
  return axios.put(`api/update-cat`, data);
}

// ---------------------- post -------------------

const getAllpost = () => {
  return axios.get(`/api/get-post`);
};

const createpost = (data) => {
  return axios.post(`/api/create-post`, data);
}

const deletepost = (id) => {
  return axios.delete(`/api/delete-post`, {
    data: { id: id }
  })
}

const getpostById = (id) => {
  return axios.get(`api/get-post-by-id?id=${id}`);
}

const updatepost = (data) => {
  return axios.put(`api/update-post`, data);
}

// ---------------------- comment -------------------

const getAllcomment = () => {
  return axios.get(`/api/get-comment`);
};

const createcomment = (data) => {
  return axios.comment(`/api/create-comment`, data);
}

const deletecomment = (id) => {
  return axios.delete(`/api/delete-comment`, {
    data: { id: id }
  })
}

const getcommentById = (id) => {
  return axios.get(`api/get-comment-by-id?id=${id}`);
}

const updatecomment = (data) => {
  return axios.put(`api/update-comment`, data);
}

export {
  handleLoginApi,   getAllcode,

  /* admin */
  getAllAdmin, createAdmin, deleteAdmin, getAdminById, updateAdmin,
  /* user */
  getAllUser, createUser, deleteUser, getUserById, updateUser,
  /* category */
  getAllcat, createcat, deletecat, getcatById, updatecat,
  /* posts */
  getAllpost, createpost, deletepost, getpostById, updatepost,
  /* comments */
  getAllcomment,createcomment, deletecomment, getcommentById, updatecomment,
  
};
