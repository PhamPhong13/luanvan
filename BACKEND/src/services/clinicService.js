import db from "../models/index";


// create a new patient
let createClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    // check input parameters
    if (!data.name || !data.image) {
      resolve({
        errCode: 1,
        message: "Missing required parameter!",
      });
    }

    try {
       await db.Clinic.create({
          name: data.name,
          image: data.image,
          address: data.address,
          descMarkdown: data.descMarkdown,
          descHTML: data.descHTML,
        });  
        resolve({
              errCode: 0,
              message: "Create a new clinic successfully!",
            });
    } catch (err) {
      reject(err);
    }
  });
};

let getClinic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let clinics = await db.Clinic.findAll();
      if (clinics) {
        resolve({
          errCode: 0,
          message: "get list clinic successfully!",
          data: clinics,
        });
      } else {
        resolve({
          errCode: 1,
          message: "get list clinic failed!",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};


let deleteClinic = (id) => {
  return new Promise(async (resolve, reject) => {
    if (!id) {
      resolve({
        errCode: 1,
        message: "Missing required parameter!",
      });
    }
    let Patient = await db.Clinic.findOne({
      where: { id: id },
    });

    if (!Patient) {
      resolve({
        errCode: 2,
        errMessage: "Clinic not found!",
      });
    }

    await db.Clinic.destroy({
      where: { id: id },
    });
    resolve({
      errCode: 0,
      errMessage: "Delete Clinic succeed!",
    });
  });
};

module.exports = {
    createClinic: createClinic,
    getClinic: getClinic,
    deleteClinic: deleteClinic
}