import express from "express";
import admin from "../controllers/adminController";
import user from "../controllers/userController";
import cat from "../controllers/catController";

let router = express.Router();

let initWebRoutes = (app) => {
  // route login
  router.post("/api/login", admin.login); // login
  // route allcode
  router.get("/api/get-allcode", user.getAllCode); // get all code

  // route admin
  router.post("/api/create-admin", admin.createAdmin); // create admin
  router.get("/api/get-admin", admin.getAdmin); // get admin
  router.get("/api/get-admin-by-id", admin.getAdminById); // get admin by id
  router.delete("/api/delete-admin", admin.deleteAdmin); // delete admin
  router.put("/api/update-admin", admin.updateAdmin); // update admin

  // route user
  router.post("/api/create-user", user.createUser); // create User
  router.get("/api/get-user", user.getUser); // get User
  router.get("/api/get-user-by-id", user.getUserById); // get User by id
  router.delete("/api/delete-user", user.deleteUser); // delete User
  router.put("/api/update-user", user.updateUser); // update User

  // route cat
  router.post("/api/create-cat", cat.createcat); // create cat
  router.get("/api/get-cat", cat.getcat); // get cat
  router.get("/api/get-cat-by-id", cat.getcatById); // get cat by id
  router.delete("/api/delete-cat", cat.deletecat); // delete cat
  router.put("/api/update-cat", cat.updatecat); // update cat 

 return app.use("/", router);
};

module.exports = initWebRoutes;
