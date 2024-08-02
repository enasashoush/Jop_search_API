import joi from 'joi';
import { generalFeilds } from '../../../utlis/generalFields.js';

// create company vaildation 
export const createCompanySchema = joi.object({
    companyName: joi.string().max(20).min(3).trim().required(),
    companyEmail: generalFeilds.email.required(),
    description: joi.string().max(500).min(5),
    industry: joi.string().max(100).min(2),
    address: joi.string().max(500).min(5).trim(),
    numberOfEmployees: joi.number().max(20).min(11),
    companyHR: generalFeilds._id.required()
}).required()

// update company vaildation 
export const updateCompanySchema = joi.object({
    companyId: generalFeilds._id.required(),
    companyName: joi.string().max(20).min(3).trim(),
    companyEmail: generalFeilds.email,
    description: joi.string().max(500).min(5),
    industry: joi.string().max(100).min(2),
    address: joi.string().max(500).min(5).trim(),
    numberOfEmployees: joi.number().max(20).min(11),
    companyHR: generalFeilds._id.required()

}).required()

// delete company vaildation 
export const deleteCompanySchema = joi.object({
    companyId: generalFeilds._id.required(),
    companyHR: generalFeilds._id.required()
}).required()

// get company id vaildation 
export const getIdCompanySchema = joi.object({
    companyId: generalFeilds._id.required()
}).required()

// auth validation in headers
export const tokenSchema = joi.object({
    auth: generalFeilds.token,
}).required()   

// search for company name validatiion
export const searchCompanyNameSchema = joi.object({
    companyName : joi.string().required(),
}).required()

export const applicationSchema = joi.object({
    companyId : generalFeilds._id,
    
}).required()