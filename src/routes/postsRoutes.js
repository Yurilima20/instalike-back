import express from "express";
import multer from "multer";
import {
  listarPosts,
  postarNovoPost,
  uploadImagem,
} from "../controllers/postsController.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// no linux ou mac não precisa da configutação do storage, pois ele já irá conseguir criar as pastas corretamente para o sistema
const upload = multer({ dest: "./uploads", storage });

const routes = (app) => {
  app.use(express.json());

  app.get("/posts/", listarPosts);
  app.post("/posts", postarNovoPost);
  app.post("/upload", upload.single("imagem"), uploadImagem);
};

export default routes;
