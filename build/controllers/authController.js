import jwt from "jsonwebtoken";
import User from "./../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import process from "process";
const jwtSecret = process.env.JWT_SECRET;
const jwtValidFor = process.env.JWT_EXPIRES_IN;
const jwtCookieValidFor = process.env
    .JWT_COOKIE_EXPIRES_IN;
const signToken = (userId) => {
    return jwt.sign({ userId }, jwtSecret, {
        expiresIn: jwtValidFor,
    });
};
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date((Date.now() + jwtCookieValidFor) * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    if (process.env.NODE_ENV === "production")
        cookieOptions.secure = true;
    res.cookie("jwt", token, cookieOptions);
    user.password = "undefined";
    res.status(statusCode).json({ status: "success", token, data: { user } });
};
const protect = catchAsync(async (req, res, next) => {
    const candidateToken = req.cookies.jwt;
    if (!candidateToken) {
        return next(new Error("You are not logged in, please log in to get access"));
    }
    jwt.verify(candidateToken, jwtSecret, async (err, decodedToken) => {
        if (err)
            return next(new Error("The token you have provided seems to be incorrect."));
    });
});
const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        next(new Error("An email or password is required."));
    const user = await User.findOne({ email }).select("+password");
    if (!user)
        next(new Error("The email or password is incorrect"));
});
const signup = catchAsync(async (req, res, next) => {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    });
});
export { protect, login, signup };
