import joi from 'joi';
import { generalFeilds } from './../../../utlis/generalFields.js';

// auth validation in headers
export const tokenSchema = joi.object({
    auth: joi.string().required(),
}).required()

// update user validation
export const updateUserSchema = joi.object({
    firstName: joi.string().min(2).max(20),
    lastName: joi.string().min(2).max(20),
    email: generalFeilds.email,
    phone: joi.string(),
    recoveryEmail: generalFeilds.email,
    DOB: joi.string(),
    _id: generalFeilds._id.required()
}).required();

// get others profile data
export const getOtherProfilesDataSchema = joi.object({
    _id: generalFeilds._id.required()
}).required()

// get accounts data   recovery email
export const getAccountsByRecoveryEmailSchema = joi.object({
    recoveryEmail: generalFeilds.email.required()
}).required()

