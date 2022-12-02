import mongoose, { Schema } from "mongoose";

// validation tools
import * as EmailValidator from "email-validator";

const userSchema: Schema = new Schema({
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
    // Needs to be encrypted
  },
  apiToken: {
    type: String,
  },
});

const User: mongoose.Model<
  {
    [x: string]: any;
  },
  {},
  {},
  {},
  Schema<
    any,
    mongoose.Model<any, any, any, any, any>,
    {},
    {},
    {},
    {},
    "type",
    {
      [x: string]: any;
    }
  >
> = mongoose.model("User", userSchema);

export default User;
