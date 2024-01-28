import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);
// hash password
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      //lưu ý, truyền vào đúng password cần hash
      // let hashPassWord = await bcrypt.hashSync("B4c0/\/", salt); => copy paste mà ko edit nè
      let hashPassWord = await bcrypt.hashSync(password, salt);

      resolve(hashPassWord);
    } catch (e) {
      reject(e);
    }
  });
};

// check email address
let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Doctor.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

// create a new patient
let createDoctor = (data) => {
  return new Promise(async (resolve, reject) => {
    // check input parameters
    if (!data.firstName || !data.email || !data.lastName) {
      resolve({
        errCode: 1,
        message: "Missing required parameter!",
      });
    }

    try {
      let checkEmail = await checkUserEmail(data.email);
      if (checkEmail === true) {
        resolve({
          errCode: 3,
          message:
            "Your's Email is already exist in our system, plz try other email!",
        });
      } else {
        let hashPassWord = await hashUserPassword(data.password);
        await db.Doctor.create({
          email: data.email,
          password: hashPassWord,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          position: data.position,
          phone: data.phone,
          image: data.image,
          roleId: "R2",
        });

        resolve({
          errCode: 0,
          message: "Create a new patient successfully!",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

// get all patient
let getDoctor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let patients = await db.Doctor.findAll({
        attributes: {
          exclude: ["password"],
        },
        raw: true,
      });
      if (patients) {
        resolve({
          errCode: 0,
          message: "get list doctor successfully!",
          data: patients,
        });
      } else {
        resolve({
          errCode: 1,
          message: "get list doctor failed!",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

//get patient by id
let getDoctorById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let patients = await db.Doctor.findOne({
        where: {
          id: id,
        },
        attributes: {
          exclude: ["password"],
        },
        raw: true,
      });
      if (patients) {
        resolve({
          errCode: 0,
          message: "get doctor successfully!",
          data: patients,
        });
      } else {
        resolve({
          errCode: 1,
          message: "get doctor failed!",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

// delete patient
let deleteDoctor = (id) => {
  return new Promise(async (resolve, reject) => {
    if (!id) {
      resolve({
        errCode: 1,
        message: "Missing required parameter!",
      });
    }
    let Patient = await db.Doctor.findOne({
      where: { id: id },
    });

    if (!Patient) {
      resolve({
        errCode: 2,
        errMessage: "Doctor not found!",
      });
    }

    await db.Doctor.destroy({
      where: { id: id },
    });
    resolve({
      errCode: 0,
      errMessage: "Delete Doctor succeed!",
    });
  });
};


let updateDoctor = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.email ) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameter!",
        });
      }
      else{
        let doctor = await db.Doctor.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (doctor) {
          doctor.email = data.email;
          doctor.firstName = data.firstName;
          doctor.lastName = data.lastName;
          doctor.address = data.address;
          doctor.position = data.position;
          doctor.image = data.image;
          doctor.phone = data.phone;
          await doctor.save();
  
          resolve({
            errCode: 0,
            errMessage: "Update doctor succeed!",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Doctor not found!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getDoctorInForByDoctorId = (id) => {
  return new Promise(async(resolve, reject) => {
    try {
      if(!id){
        resolve({
          errCode: 2,
          errMessage: "Missing required parameter!",
        })
      }

      else {
        await db.Doctor_Infor.findOrCreate({
          where: {
            doctorId: id
          },
          defaults: {
            doctorId: id
          }
        })

        let doctorInfor = await db.Doctor_Infor.findOne({
          where: {
            doctorId: id
          },
          raw: true,
          attributes: {
            exclude: ["password"]
          }
        })

        resolve({
          errCode: 0,
          errMessage: "Get doctor infor successfully!",
          data: doctorInfor
        })
        
      }
    }
    catch(err) {
      reject(err);
    }
  })
}


module.exports = {
  createDoctor: createDoctor,
  getDoctor: getDoctor,
  getDoctorById: getDoctorById,
  deleteDoctor: deleteDoctor,
  updateDoctor: updateDoctor,
  getDoctorInForByDoctorId: getDoctorInForByDoctorId
};
