import { Schema, model } from "mongoose";
import * as EmailValidator from "email-validator";
import bcrypt from "bcrypt";
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
        unique: true,
        validate: {
            validator: function (email) {
                return EmailValidator.validate(email);
            },
            message: (props) => `${props.value} is not a valid email!!!`,
        },
    },
    password: {
        type: String,
        required: [true, "A password is required for a user to be created."],
        minlength: [
            8,
            "Your password has to have a minimum length of 8 characters.",
        ],
    },
    apiToken: {
        type: String,
        unique: true,
    },
});
userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});
userSchema.methods.correctPassword = async function correctPassword(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};
const User = model("User", userSchema);
export default User;
