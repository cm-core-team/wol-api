import { Schema, Model } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 20,
  },
  lastName: {
    type: String,
    required: true,
    maxLenth: 20,
  },
  email: {
    type: String,
    required: true,
    // Needs to be validated
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    // Needs to be encrypted
  },
  passwordConfirm: {
    type: String,
    required: true,
    minLength: 8,
    // Needs to be checked against the password field to confirm that the password is correct
  },
});

const User = new Model(userSchema, "user");

export default User;
