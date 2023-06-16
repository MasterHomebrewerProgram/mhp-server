import express, { Request } from "express";
import { SanitizedUserOutput, UserInput } from "../../db/models";
import {
  getUser,
  registerUser,
  resetPassword,
  updateUser,
  validateEmail,
} from "../../db/data-access";
const router = express.Router();

interface RequestWithMiddleware extends Request {
  user?: SanitizedUserOutput;
}

interface GetUserRequest extends RequestWithMiddleware {
  params: {
    userId: string;
  };
}

router.get("/:userId", async (req: GetUserRequest, res) => {
  try {
    const user = await getUser(req.params.userId);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

interface CreateUserRequest extends Request {
  body: UserInput & { password: string };
}

router.post("/create", async (req: CreateUserRequest, res) => {
  const userParams = req.body;

  try {
    const newUser = await registerUser(userParams);
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

interface UpdateUserRequest extends Request {
  body: UserInput & { password: string };
}

router.post("/update", async (req: UpdateUserRequest, res) => {
  const userParams = req.body;

  try {
    const newUser = await updateUser(userParams);
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

interface ValidateUserRequest extends Request {
  params: {
    key: string;
  };
}

router.get("/validate/:key", async (req: ValidateUserRequest, res) => {
  const validationKey: string = req.params.key;

  try {
    const user = await validateEmail(validationKey);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

interface ResetPasswordRequest extends Request {
  body: {
    email: string;
    key: string;
    password: string;
  };
}

router.post("/reset", async (req: ResetPasswordRequest, res) => {
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
