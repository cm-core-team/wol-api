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
  }
});

const User = new Model(userSchema, "user");

export default User;
