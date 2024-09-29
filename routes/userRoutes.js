import { Router } from "express";
import {
  createUser,
  updateUser,
  fetchUsers,
  showUser,
  deleteUser,
  signUp,
  signIn,
} from "../Contraoller/UserController.js";
import { authenticateToken } from "../middlewares/auth.js";
const router = Router();

// router.post("/", createUser);
router.put("/:id", updateUser);
// router.get("/", fetchUsers);
router.get("/", authenticateToken, fetchUsers);
router.get("/:id", showUser);
router.delete("/:id", deleteUser);
router.post("/signup", signUp);
router.post("/signin", signIn);

export default router;
