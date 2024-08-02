import joi from 'joi'
import { generalFeilds } from './../../../utlis/generalFields.js';

// sign up validation
export const signUpSchema = joi.object({
    firstName: joi.string().min(2).max(20).required(),
    lastName: joi.string().min(2).max(20).required(),
    email: generalFeilds.email.required(),
    password: generalFeilds.password.required(),
    cPassword: joi.string().valid(joi.ref('password')).required(),
    phone: joi.string().max(11).min(11).required(),
    DOB: joi.number(),
    recoveryEmail: generalFeilds.email,
}).required()

// login validation
export const logInSchema = joi.object({
    email: generalFeilds.email,
    phone: joi.string(),
    password: generalFeilds.password.required(),
}).required()

//validation on token in params vaildation
export const tokenSchema = joi.object({
    token: joi.string().required(),
}).required()

//sendCode validation
export const sendCodeSchema = joi.object({
    email: generalFeilds.email.required(),
}).required()

// forget password validation
export const forgetPasswordSchema = joi.object({
    email: generalFeilds.email.required(),
    code: joi.string().pattern(/^\d{6}$/).required(),
    password: generalFeilds.password.required(),
    cPassword: joi.string().valid(joi.ref('password')).required(),
}).required()

//update password validation
export const updatePasswordSchema = joi.object({
    newPassword: generalFeilds.password,
    oldPassword: generalFeilds.password,
    cPassword: joi.string().valid(joi.ref('newPassword')).required(),
}).required()

// auth validation in headers
export const authSchema = joi.object({
    auth: joi.string().required(),
}).required()





