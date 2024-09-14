import { Router } from "express";
import {
  createComment,
  fetchComments,
  showComment,
  deleteComment,
} from "../Contraoller/CommentController.js";
const router = Router();

router.post("/", createComment);
router.get("/", fetchComments);
router.get("/:id", showComment);
router.delete("/:post/:id", deleteComment);

export default router;
