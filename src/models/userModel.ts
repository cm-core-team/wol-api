import { Schema, model } from "mongoose";

// Validation tools.
import * as EmailValidator from "email-validator";

export interface IUser {
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
        // Needs to be encrypted
    },
    apiToken: {
        type: String,
        unique: true,
    },
});

const User = model<IUser>("User", userSchema);

export default User;
