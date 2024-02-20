import express from "express";
import admin from "../controllers/adminController";
import user from "../controllers/userController";
import cat from "../controllers/catController";
import post from "../controllers/postController";
import comment from "../controllers/commentController";
import repcomment from "../controllers/repcommentController";

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

  // route post
  router.post("/api/create-post", post.createpost); // create post
  router.get("/api/get-post", post.getpost); // get post
  router.get("/api/get-post-by-id", post.getpostById); // get post by id
  router.delete("/api/delete-post", post.deletepost); // delete post
  router.put("/api/update-post", post.updatepost); // update post

  // route commment
  router.post("/api/create-comment", comment.createcomment); // create comment
  router.get("/api/get-comment", comment.getcomment); // get comment
  router.get("/api/get-comment-by-id", comment.getcommentById); // get comment by id
  router.delete("/api/delete-comment", comment.deletecomment); // delete comment
  router.put("/api/update-comment", comment.updatecomment); // update comment

   // route repcomment
  router.post("/api/create-repcomment", repcomment.createrepcomment); // create repcomment
  router.get("/api/get-repcomment", repcomment.getrepcomment); // get repcomment
  router.get("/api/get-repcomment-by-id", repcomment.getrepcommentById); // get repcomment by id
  router.delete("/api/delete-repcomment", repcomment.deleterepcomment); // delete repcomment
  router.delete("/api/delete-repcomment-by-commentid", repcomment.deleterepcommentbycomment); // delete repcomment
  router.put("/api/update-repcomment", repcomment.updaterepcomment); // update repcomment

 return app.use("/", router);
};

module.exports = initWebRoutes;
