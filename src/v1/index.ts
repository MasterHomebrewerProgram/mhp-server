import express from "express";
import userRouter from "./user";
import authRouter from "./auth";
import scoresheetRouter from "./scoresheet";

const router = express.Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/scoresheet", scoresheetRouter);

export default router;
