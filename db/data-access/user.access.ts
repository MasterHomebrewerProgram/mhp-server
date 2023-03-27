const crypto = require("crypto");
import User, { SanitizedUserOutput, UserInput } from "../models/user.model"

export const loginUser = async (email: string, password: string): Promise<SanitizedUserOutput> => {
  const user = await User.findOne({
    where: {email}
  })

  if (!user) {
    return Promise.reject({message: "Could not find user"})
  }

  if (await user.hashPassword(password) !== user.password) {
    return Promise.reject({
      message: "Invalid password"
    })
  }

  return user.sanitize()
}

export const getUser = async (userId: string): Promise<SanitizedUserOutput> => {
  const user = await User.findOne({
    where: {id: userId}
  })

  if (!user) {
    return Promise.reject({message: "Could not find user"})
  }

  return user.sanitize()
}

export const registerUser = async (userData: UserInput & {password : string}): Promise<SanitizedUserOutput> => {
  userData.email = userData.email.toLocaleLowerCase()

  const existingUser = User.findOne({ where: { email: userData.email } })

  // Check if user email already exists
  if (!!existingUser) {
    return Promise.reject({
      message: "Email address already registered"
    });
  }

  // Test email for validity
  const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  if (!emailRegex.test(userData.email)) {
    return Promise.reject({
      message: "Invalid email format",
    });
  }

  // Test password for validity
  const passwordRegex = new RegExp(/.*/); // TODO(matt): currently matches anythigng, make this stronger
  if (!passwordRegex.test(userData.password)) {
    return Promise.reject({
      message: "Password does not meet security criteria"
    });
  }

  const emailVerificationCode = crypto.randomBytes(32).toString("hex");

  const newUser = await User.create({
    email: userData.email,
    fname: userData.fname,
    lname: userData.lname,
    photourl: userData.photourl,
    bio: userData.bio,
    password: userData.password,
    emailVerified: false,
    emailVerificationCode: emailVerificationCode,
    adminLevel: 0
  })

  return newUser.sanitize()
}

export const validateEmail = async (userId: string, verificationCode: string): Promise<SanitizedUserOutput> => {
  const user = await User.findOne({
    where: {
      id: userId,
      emailVerificationCode: verificationCode
    }
  })

  if (!user) {
    return Promise.reject({
      message: "Could not match user to validation code"
    })
  }

  await user.update({
    emailVerificationCode: undefined,
    emailVerified: true
  })

  return user.sanitize()
}

export const passwordChangeRequest = async (email: string): Promise<SanitizedUserOutput> => {
  const user = await User.findOne({
    where: {email}
  })

  if (!user) {
    return Promise.reject({
      message: "Could not match user to email"
    })
  }

  const passwordResetCode = crypto.randomBytes(32).toString("hex");
  await user.update({ passwordResetCode })

  return user.sanitize()
}

export const resetPassword = async (email: string, passwordResetCode: string, password: string): Promise<SanitizedUserOutput> => {
  const user = await User.findOne({
    where: {
      email,
      passwordResetCode
    }
  })

  if (!user) {
    return Promise.reject({
      message: "Cound not match user to verification code"
    })
  }

  await user.update({ password })

  return user.sanitize()
}