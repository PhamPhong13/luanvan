import express from "express";
import patient from "../controllers/patientController";
import admin from "../controllers/adminController";
import doctor from "../controllers/doctorController";
import user from "../controllers/userController";
import clinic from "../controllers/clinicController";

let router = express.Router();

let initWebRoutes = (app) => {
  // route login
  router.post("/api/login", user.login); // login
  // route allcode
  router.get("/api/get-allcode", user.getAllCode); // get all code

  // route patient
  router.post("/api/create-patient", patient.createPatient); // create patient
  router.get("/api/get-patient", patient.getPatient); // get patient
  router.get("/api/get-patient-by-id", patient.getPatientById); // get patient by id
  router.delete("/api/delete-patient", patient.deletePatient); // delete patient
  router.put("/api/update-patient", patient.updatePatient); // update patient

  // route admin
  router.post("/api/create-admin", admin.createAdmin); // create admin
  router.get("/api/get-admin", admin.getAdmin); // get admin
  router.get("/api/get-admin-by-id", admin.getAdminById); // get admin by id
  router.delete("/api/delete-admin", admin.deleteAdmin); // delete admin
  router.put("/api/update-admin", admin.updateAdmin); // update admin

  // route doctor
  router.post("/api/create-doctor", doctor.createDoctor); // create doctor
  router.get("/api/get-doctor", doctor.getDoctor); // get doctor
  router.get("/api/get-doctor-by-id", doctor.getDoctorById); // get doctor by id
  router.delete("/api/delete-doctor", doctor.deleteDoctor); // delete doctor
  router.put("/api/update-doctor", doctor.updateDoctor); // update doctor

  router.post("/api/get-doctorinfor-by-doctor-id", doctor.getDoctorInForByDoctorId); // get doctor infor

  // router clinic
  router.post("/api/create-clinic", clinic.createClinic); // create clinic
  router.get("/api/get-clinic", clinic.getClinic); // get clinic
  router.get("/api/get-clinic-by-id", clinic.getClinicById); // get clinic by id
  router.delete("/api/delete-clinic", clinic.deleteClinic); // delete clinic
  router.put("/api/update-clinic", clinic.updateClinic); // update clinic
  return app.use("/", router);
};

module.exports = initWebRoutes;
