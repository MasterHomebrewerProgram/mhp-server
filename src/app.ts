import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import crypto from "crypto";
import passport from "passport";
import cors from "cors";

import sequelizeConnection from "./../db/config";
import { initS3 } from "../s3";
import v1 from "./v1";
import { dbInit } from "../db/init";

const isDev = process.env.NODE_ENV === "development";

// Initialize Buckets
initS3();

// Set up persistent sessions
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Express definitions
const app = express();
const port = isDev ? 5000 : 8080;

// Middleware
if (isDev) {
  app.use(cors());
}
app.set("trust proxy", 1);
app.use(
  session({
    secret:
      process.env.NODE_ENV === "development"
        ? "keyboard cat"
        : crypto.randomBytes(32).toString("hex"),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: !isDev },
    store: new SequelizeStore({
      db: sequelizeConnection,
    }),
  })
);
// sequelizeConnection.sync();
dbInit(false);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

if (isDev) {
  // Enable cross-origin requests for dev (useful for localhost)
  app.use(cors());
}

// API definitions
app.use(express.static("public"));
app.use("/api/v1", v1);

// Static content
// TODO(matt): make this serve React webpack assets
app.get("/", (req, res) => {
  res.send("Welcome to the MHP Homepage!");
});

// Serve
app.listen(port, () => {
  return console.log(`Listening at http://localhost:${port}`);
});
