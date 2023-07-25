import express, { Request } from "express";
import { Style } from "../../db/models";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const styles = await Style.findAll();

    res.json(styles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

export default router;
