import express from "express";
import userRouter from "./user";
import authRouter from "./auth";
import scoresheetRouter from "./scoresheet";
import styleRouter from "./style";
import compRouter from "./comp";

const router = express.Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/scoresheet", scoresheetRouter);
router.use("/style", styleRouter);
router.use("/comp", compRouter);

export default router;
