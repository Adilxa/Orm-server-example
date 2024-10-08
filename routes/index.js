import { Router } from "express";
import UserRouter from "./userRoutes.js";
import PostRouter from "./postRoutes.js";
import CommentRouter from "./commentRoutes.js";
import ChatRouter from "./chatRouter.js";
import EmailRouter from "./emailRouter.js";

const router = Router();

router.use("/api/user", UserRouter);
router.use("/api/post", PostRouter);
router.use("/api/comment", CommentRouter);
router.use("/api/chat", ChatRouter);
router.use("/api/mail", EmailRouter);

export default router;
