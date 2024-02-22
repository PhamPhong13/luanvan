import express from "express";
import admin from "../controllers/adminController";
import user from "../controllers/userController";
import cat from "../controllers/catController";
import post from "../controllers/postController";
import comment from "../controllers/commentController";
import repcomment from "../controllers/repcommentController";
import bg from "../controllers/bgController";
import likepost from "../controllers/likepostController";
import nhiemky from "../controllers/nhiemkyController";
import menber from "../controllers/menberController";

let router = express.Router();

let initWebRoutes = (app) => {
  // route login
  router.post("/api/login", admin.login); // login
  router.post("/api/login-user", user.login); // login
  router.post("/api/usersendemail", user.usersendemail); // login
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

   // route nhiemky
  router.post("/api/create-nhiemky", nhiemky.createnhiemky); // create nhiemky
  router.get("/api/get-nhiemky", nhiemky.getnhiemky); // get nhiemky
  router.get("/api/get-nhiemky-by-id", nhiemky.getnhiemkyById); // get nhiemky by id
  router.delete("/api/delete-nhiemky", nhiemky.deletenhiemky); // delete nhiemky
  router.put("/api/update-nhiemky", nhiemky.updatenhiemky); // update nhiemky

  // route post
  router.post("/api/create-post", post.createpost); // create post
  router.get("/api/get-post", post.getpost); // get post
  router.get("/api/get-post-by-id", post.getpostById); // get post by id
  router.get("/api/get-post-all-by-id", post.getAllpostById); // get post by id
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

  // route bg
  router.post("/api/create-bg", bg.createbg); // create bg
  router.get("/api/get-bg", bg.getbg); // get bg
  router.get("/api/get-bg-by-id", bg.getbgById); // get bg by id
  router.delete("/api/delete-bg", bg.deletebg); // delete bg
  router.put("/api/update-bg", bg.updatebg); // update bg

  // route likepost
  router.post("/api/create-likepost", likepost.createlikepost); // create likepost
  router.get("/api/get-likepost", likepost.getlikepost); // get likepost
  router.get("/api/get-likepost-by-id", likepost.getlikepostById); // get likepost by id
  router.delete("/api/delete-likepost", likepost.deletelikepost); // delete likepost
  router.put("/api/update-likepost", likepost.updatelikepost); // update likepost

    // route menber
  router.post("/api/create-menber", menber.createmenber); // create menber
  router.get("/api/get-menber", menber.getmenber); // get menber
  router.get("/api/get-menber-by-id", menber.getmenberById); // get menber by id
  router.delete("/api/delete-menber", menber.deletemenber); // delete menber
  router.put("/api/update-menber", menber.updatemenber); // update menber

 return app.use("/", router);
};

module.exports = initWebRoutes;
