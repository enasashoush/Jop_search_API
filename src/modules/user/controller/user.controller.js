import userModel from '../../../DB/models/User.model.js';
import { asyncHandller } from './../../../utlis/asyncHandler.js';

// update user 
export const updateUser = asyncHandller(
    async (req, res, next) => {
        const { _id } = req.user
        const { email, phone, firstName, lastName } = req.body;
        const user = await userModel.findOne({ _id });
        if (!user) {
            return next(new Error('User not found', { cause: 404 }))
        }
        if (await userModel.findOne({ email })) {
            return next(new Error('email already exist', { cause: 404 }))
        }
        if (await userModel.findOne({ phone })) {
            return next(new Error('phone already exist', { cause: 404 }))
        }
        if (req.body._id != _id) {
            return next(new Error("user not authoized", { cause: 409 }))
        }
        if (String(user._id) !== String(_id)) {
            return next(
                new Error("You are not authorized to update this user", { cause: 403 })
            );
        }
        const updatedUsername = `${firstName.toLowerCase()}${lastName.toLowerCase()}`;
        const newUser = await userModel.findByIdAndUpdate(
            _id,
            { ...req.body, username: updatedUsername },
            { new: true })
        return res.json({ message: 'user updated', newUser })
    })

// delete user 
export const deleteUser = asyncHandller(
    async (req, res, next) => {
        const { _id } = req.user;
        const emailDelete = await userModel.findOne({ _id });
        if (!emailDelete) {
            return next(new Error("email not found"));
        }
        if (req.body._id != _id) {
            return next(new Error("user not authoized", { cause: 409 }))
        }
        if (String(emailDelete._id) !== String(_id)) {
            return next(
                new Error("You are not authorized to update this user", { cause: 403 })
            );
        }
        const user = await userModel.findOneAndDelete(emailDelete)
        return res.status(200).json({ message: "Done" });
    })

//get User Data
export const getUserData = asyncHandller(
    async (req, res, next) => {
        const user = await userModel.findOne(req.user._id)
        if (!user) {
            return next(new Error('User not found', { cause: 404 }))
        }
        if (req.body._id != req.user._id) {
            return next(new Error("user not authoized", { cause: 409 }))
        }
        if (String(user._id) !== String(req.user._id)) {
            return next(
                new Error("You are not authorized to update this user", { cause: 403 })
            );
        }
        return res.status(200).json({ message: " done", user })
    })

//Get profile data for another user 
export const getOtherProfilesData = asyncHandller(
    async (req, res, next) => {
        const { _id } = req.params
        const user = await userModel.findOne({ _id })
        return res.status(200).json({ message: "done", user })
    })

// Get all accounts associated to a specific recovery Email 
export const getAccountsByRecoveryEmail = asyncHandller(
    async (req, res, next) => {
        const { recoveryEmail } = req.params;
        const accounts = await userModel.find({ recoveryEmail })
        return res.status(200).json({ message: "done", user: accounts });
    })
