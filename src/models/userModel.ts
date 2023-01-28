import { Schema, model, HydratedDocument } from "mongoose";
import { NextFunction } from "express";

// Validation tools.
import * as EmailValidator from "email-validator";
import bcrypt from "bcrypt";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  apiToken?: string;
}

/**
 * Schema (blueprint) for new users to be created.
 *
 * @class User
 */
const userSchema: Schema<IUser> = new Schema({
  firstName: {
    type: String,
    required: [true, "A first name is required for a user to be created."],
    maxLength: 20,
  },
  lastName: {
    type: String,
    required: [true, "A last name is required for a user to be created."],
    maxLength: 20,
  },
  email: {
    type: String,
    required: [true, "An email is required for a user to be created."],
    unique: true,
    validate: {
      validator: function (email: string) {
        return EmailValidator.validate(email);
      },
      message: (props: any) => `${props.value} is not a valid email!!!`,
    },
  },
  password: {
    type: String,
    required: [true, "A password is required for a user to be created."],
    minlength: [
      8,
      "Your password has to have a minimum length of 8 characters.",
    ],
    // Needs to be encrypted
  },
  apiToken: {
    type: String,
    unique: true,
  },
});

userSchema.pre("save", async function (next): Promise<void> {
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.correctPassword = async function correctPassword(
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const User = model<IUser>("User", userSchema);

export default User;
