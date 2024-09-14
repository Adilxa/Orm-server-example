import { Router } from "express";
import {
  createPost,
  fetchPosts,
  showPost,
  deletePost,
  searchPost,
} from "../Contraoller/PostController.js";
const router = Router();

router.post("/", createPost);
router.get("/", fetchPosts);
router.get("/search", searchPost);

router.get("/:id", showPost);
router.delete("/:id", deletePost);

// api/post/search?q=dasdasd

export default router;
