import express from "express";
import admin from "../controllers/adminController";
import user from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
  // route login
  router.post("/api/login", user.login); // login
  // route allcode
  router.get("/api/get-allcode", user.getAllCode); // get all code

  // route admin
  router.post("/api/create-admin", admin.createAdmin); // create admin
  router.get("/api/get-admin", admin.getAdmin); // get admin
  router.get("/api/get-admin-by-id", admin.getAdminById); // get admin by id
  router.delete("/api/delete-admin", admin.deleteAdmin); // delete admin
  router.put("/api/update-admin", admin.updateAdmin); // update admin

 
};

module.exports = initWebRoutes;
