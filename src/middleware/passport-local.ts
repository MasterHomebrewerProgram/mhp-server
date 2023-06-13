import passport from "passport";
const LocalStrategy = require("passport-local");

import User, { SanitizedUserOutput } from "./../../db/models/user.model";

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    function (
      email: string,
      password: string,
      done: (err, user?: SanitizedUserOutput | boolean) => void
    ) {
      User.findOne({
        where: { email },
      })
        .then(async (user) => {
          if (!user) {
            return done(null, false);
          } else if (await user.validatePassword(password)) {
            return done(null, await user.sanitize());
          }
          return done(null, false);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

export default passport;
