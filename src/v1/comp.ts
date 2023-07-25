import express, { Request } from "express";
import { Comp } from "../../db/models";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.json(await Comp.findAll());
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

export default router;
