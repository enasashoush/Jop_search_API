import joi from 'joi';
import { generalFeilds } from '../../../utlis/generalFields.js';

// create job vaildation 
export const createJobSchema = joi.object({
    jobTitle: joi.string().max(20).min(3).trim().required(),
    jobLocation: joi.string().valid('onsite', 'remotely', 'hybrid').required(),
    workingTime: joi.string().valid('part-time', 'full-time').required(),
    seniorityLevel: joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', ' CTO').required(),
    jobDescription: joi.string().max(500).min(5).trim(),
    technicalSkills: joi.array().items(joi.string()).required(),
    softSkills: joi.array().items(joi.string()).required(),
    numberOfEmployees: joi.number().max(20).min(11),
    companyId: generalFeilds._id.required(),
}).required()

// update job vaildation 
export const updateJobSchema = joi.object({
    jobTitle: joi.string().max(20).min(3).trim(),
    jobLocation: joi.string().valid('onsite', 'remotely', 'hybrid'),
    workingTime: joi.string().valid('part-time', 'full-time'),
    seniorityLevel: joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', ' CTO'),
    jobDescription: joi.string().max(500).min(5).trim(),
    technicalSkills: joi.array().items(joi.string()),
    softSkills: joi.array().items(joi.string()),
    numberOfEmployees: joi.number().max(20).min(11),
    jobId: generalFeilds._id.required(),
    companyId: generalFeilds._id.required(),
}).required()

// delete job vaildation 
export const deleteJobSchema = joi.object({
    jobId: generalFeilds._id.required(),
}).required()

// auth validation in headers
export const tokenSchema = joi.object({
    auth: generalFeilds.token,
}).required()   

// apply for job validation
export const applyJobSchema = joi.object({
    file: generalFeilds.file.required(),
    userSoftSkills:joi.string().required(),
    userTechSkills:joi.string().required(),
    jobId: generalFeilds._id.required(),
    jobTitle: joi.string().required()
}).required() 