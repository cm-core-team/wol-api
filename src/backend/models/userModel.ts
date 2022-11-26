import { Schema, Model } from "mongoose";

// validation tools
import * as EmailValidator from "email-validator";

const userSchema = new Schema({
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
    validate: {
      validator: function (email: string) {
        return EmailValidator.validate(email);
      },
      message: (props: any) => `${props.value} is not a valid email!!!`,
    },
    // Needs to be validated
  },
  password: {
    type: String,
    required: [true, "A password is required for a user to be created."],
    minLength: 8,
    // Needs to be encrypted
  },
});

const User = new Model(userSchema, "user");

export default User;
