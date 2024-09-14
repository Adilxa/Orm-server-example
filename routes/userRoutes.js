import { Router } from "express";
import {
  createUser,
  updateUser,
  fetchUsers,
  showUser,
  deleteUser,
} from "../Contraoller/UserController.js";
const router = Router();

router.post("/", createUser);
router.put("/:id", updateUser);
router.get("/", fetchUsers);
router.get("/:id", showUser);
router.delete("/:id", deleteUser);

export default router;
