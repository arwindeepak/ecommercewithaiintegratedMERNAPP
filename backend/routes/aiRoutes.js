import express from "express";
import { aiChat, recommendProducts } from "../controllers/aiController.js";

const router = express.Router();

router.post("/chat", aiChat);
router.post("/recommend", recommendProducts);

export default router;
