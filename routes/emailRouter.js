import { Router } from "express";
import { SendEmail } from "../Contraoller/EmailController.js";
const router = Router();

router.post("/", SendEmail);

export default router;
