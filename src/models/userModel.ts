import mongoose, { Schema } from "mongoose";

// Validation tools.
import * as EmailValidator from "email-validator";

// Blueprint for all the users.
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

// Model which will be used in the user controller.
const User = mongoose.model("User", userSchema);

export default User;
