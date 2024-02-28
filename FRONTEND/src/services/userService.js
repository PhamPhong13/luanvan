import axios from "../axios";

// function handle login
const handleLoginApi = (email, password) => {
  return axios.post("api/login", { email, password }); // request len server
};
const handleLoginUser = (email, password) => {
  return axios.post("api/login-user", { email, password }); // request len server
};


// get all code
const getAllcode = (inputData) => {
  return axios.get(`/api/get-allcode?type=${inputData}`);
};

// ---------------------- admin -------------------

const getAllAdmin = (page, word) => {
  return axios.get(`/api/get-all-admin?page=${page}&word=${word}`);
};

const getAdmin = (page) => {
  return axios.get(`/api/get-admin?page=${page}`);
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

const getAllUser = (page, word) => {
  return axios.get(`/api/get-all-user?page=${page}&word=${word}`);
};

const getUser = (page) => {
  return axios.get(`/api/get-user?page=${page}`);
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

const getAllcat = (page, word) => {
  return axios.get(`/api/get-all-cat?page=${page}&word=${word}`);
};

const getcat = (page) => {
  return axios.get(`/api/get-cat?page=${page}`);
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

const getAllpost = (page, word) => {
  return axios.get(`/api/get-all-post?page=${page}&word=${word}`);
};

const getpost = (page) => {
  return axios.get(`/api/get-post?page=${page}`);
};

const getpostbypage = (page) => {
  return axios.get(`/api/get-post-by-page?page=${page}`);
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

const getAllpostById = (id) => {
  return axios.get(`api/get-post-all-by-id?id=${id}`);
}

const getAllpostBypage = (id, page) => {
  console.log("check -: ", id, page)
  
  return axios.get(`api/get-all-post-by-page?id=${id}&page=${page}`);
}
const updatepost = (data) => {
  return axios.put(`api/update-post`, data);
}

// ---------------------- comment -------------------

const getAllcomment = () => {
  return axios.get(`/api/get-comment`);
};

const createcomment = (data) => {
  return axios.post(`/api/create-comment`, data);
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


// ---------------------- repcomment -------------------

const getAllrepcomment = () => {
  return axios.get(`/api/get-repcomment`);
};

const createrepcomment = (data) => {
  return axios.post(`/api/create-repcomment`, data);
}

const deleterepcomment = (id) => {
  return axios.delete(`/api/delete-repcomment`, {
    data: { id: id }
  })
}

const deleterepcommentbycomment = (id) => {
  return axios.delete(`/api/delete-repcomment-by-commentid`, {
    data: { id: id }
  })
}

const getrepcommentById = (id) => {
  return axios.get(`api/get-repcomment-by-id?id=${id}`);
}

const updaterepcomment = (data) => {
  return axios.put(`api/update-repcomment`, data);
}


// ---------------------- bg -------------------

const getAllbg = () => {
  return axios.get(`/api/get-bg`);
};

const createbg = (data) => {
  return axios.post(`/api/create-bg`, data);
}

const deletebg = (id) => {
  return axios.delete(`/api/delete-bg`, {
    data: { id: id }
  })
}

const getbgById = (id) => {
  return axios.get(`api/get-bg-by-id?id=${id}`);
}

const updatebg = (data) => {
  return axios.put(`api/update-bg`, data);
}


// ---------------------- nhiemky -------------------

const getAllnhiemky = () => {
  return axios.get(`/api/get-nhiemky`);
};

const createnhiemky = (data) => {
  return axios.post(`/api/create-nhiemky`, data);
}

const deletenhiemky = (id) => {
  return axios.delete(`/api/delete-nhiemky`, {
    data: { id: id }
  })
}

const getnhiemkyById = (id) => {
  return axios.get(`api/get-nhiemky-by-id?id=${id}`);
}

const updatenhiemky = (data) => {
  return axios.put(`api/update-nhiemky`, data);
}

// ---------------------- menber -------------------

const getAllmenber = () => {
  return axios.get(`/api/get-menber`);
};

const createmenber = (data) => {
  return axios.post(`/api/create-menber`, data);
}

const deletemenber = (id) => {
  return axios.delete(`/api/delete-menber`, {
    data: { id: id }
  })
}

const getmenberById = (id, position) => {
  return axios.get(`api/get-menber-by-id?id=${id}&position=${position}`);
}

const updatemenber = (data) => {
  return axios.put(`api/update-menber`, data);
}


// ---------------------- likepost -------------------


const createlikepost = (data) => {
  return axios.post(`/api/create-likepost`, data);
}

const deletelikepost = (userId, postId) => {
  return axios.delete(`/api/delete-likepost`, {
    data: {  userId: userId, postId: postId}
  })
}

const getlikepostById = (userId, postId) => {
  return axios.get(`api/get-likepost-by-id?userId=${userId}&postId=${postId}`);
}

const getlikepostBypostId = (postId) => {
  return axios.get(`api/get-likepost-by-post-id?postId=${postId}`);
}


const userSendEmail = (data) => {
  return axios.post(`/api/usersendemail`, data);
}


// ---------------------- history -------------------


const createhistory = (data) => {
  return axios.post(`/api/create-history`, data);
}

const deletehistory = (userId, postId) => {
  return axios.delete(`/api/delete-history`, {
    data: {  userId: userId, postId: postId}
  })
}

const gethistoryById = (userId, postId) => {
  return axios.get(`api/get-history-by-id?userId=${userId}&postId=${postId}`);
}


// ---------------------- connect -------------------

const getAllconnect = () => {
  return axios.get(`/api/get-connect`);
};

const createconnect = (data) => {
  return axios.post(`/api/create-connect`, data);
}

const deleteconnect = (id) => {
  return axios.delete(`/api/delete-connect`, {
    data: { id: id }
  })
}

const getconnectById = (id) => {
  return axios.get(`api/get-connect-by-id?id=${id}`);
}


// ---------------------- bg -------------------

const getallreport = (id, status, page) => {
  return axios.get(`/api/get-report?id=${id}&status=${status}&page=${page}`);
};

const createreport = (data) => {
  return axios.post(`/api/create-report`, data);
}

const deletereport = (id) => {
  return axios.delete(`/api/delete-report`, {
    data: { id: id }
  })
}

const getreportById = (id) => {
  return axios.get(`api/get-report-by-id?id=${id}`);
}

const updatereport = (data) => {
  return axios.put(`api/update-report`, data);
}


const sendEmailReport = (data) => {
  return axios.post(`api/sendreport`, data);
}

const sendEmailReportPost = (data) => {
  return axios.post(`api/sendreportpost`, data);
}




export {
  handleLoginApi,   getAllcode, handleLoginUser,

  /* admin */
  getAllAdmin, createAdmin, deleteAdmin, getAdminById, updateAdmin, getAdmin,
  /* user */
  getAllUser, createUser, deleteUser, getUserById, updateUser,getUser,
  /* nhiemky */
  getAllnhiemky, createnhiemky, deletenhiemky, getnhiemkyById, updatenhiemky,
    /* menber */
  getAllmenber, createmenber, deletemenber, getmenberById, updatemenber,
  /* category */
  getAllcat, getcat, createcat, deletecat, getcatById, updatecat,
  /* posts */
  getAllpost, getpost, createpost, deletepost, getpostById, updatepost, getAllpostById,getpostbypage, getAllpostBypage, 
  /* comments */
  getAllcomment, createcomment, deletecomment, getcommentById, updatecomment,
   /* rep comment */
  getAllrepcomment, createrepcomment, deleterepcomment, getrepcommentById, updaterepcomment, deleterepcommentbycomment,
  /* backround */
  getAllbg, createbg, deletebg, getbgById, updatebg,
  /* report */
  getallreport, createreport, deletereport, getreportById, updatereport,
   /* admin */
  createlikepost, deletelikepost, getlikepostById,getlikepostBypostId,
  /* admin */
  createhistory, deletehistory, gethistoryById,
  /* connect */
  createconnect, deleteconnect, getconnectById,getAllconnect,

  userSendEmail,sendEmailReport, sendEmailReportPost,

  
};
