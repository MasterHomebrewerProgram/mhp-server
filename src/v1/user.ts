import express from "express";
import { UserInput } from "../../db/models";
import {
  getUser,
  registerUser,
  resetPassword,
  updateUser,
  validateEmail,
} from "../../db/data-access";
const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const user = await getUser(req.params.userId);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post("/create", async (req, res) => {
  const userParams: UserInput & { password: string } = req.body;

  try {
    const newUser = await registerUser(userParams);
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

router.post("/update", async (req, res) => {
  const userParams: UserInput & { password?: string } = req.body;

  try {
    const newUser = await updateUser(userParams);
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

router.get("/validate/:key", async (req, res) => {
  const validationKey: string = req.params.key;

  try {
    const user = await validateEmail(validationKey);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

router.post("/reset", async (req, res) => {
  const { email, key, password } = req.body;

  try {
    const user = await resetPassword(email, key, password);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

router.get("/", async (req, res) => {
  if (req.user) {
    res.json(req.user);
    return;
  }
  res.status(400).json({ error: "not logged in" });
});

export default router;
