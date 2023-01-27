import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        results: users.length,
        data: users,
    });
});
const createUser = catchAsync(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    const user = new User({
        firstName,
        lastName,
        email,
        password,
    });
    res.status(200).json({
        data: user,
    });
});
export { getAllUsers, createUser };
