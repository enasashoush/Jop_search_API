import { asyncHandller } from '../../../utlis/asyncHandler.js';
import slugify from 'slugify';
import jobModel from './../../../DB/models/Job.model.js';
import companyModel from './../../../DB/models/Company.model.js';
import { ApiFeatures } from '../../../utlis/apiFeatures.js';
import cloudinary from './../../../utlis/cloudinary.js';
import applicationModel from './../../../DB/models/Application.model.js';


// create job 
export const createJob = asyncHandller(async (req, res, next) => {
    const { name } = req.body
    req.body.slug = slugify(`${name}`)
    req.body.addedBy = req.user._id
    if (req.body.addedBy != req.user._id) {
        return next(new Error("user not authoized", { cause: 409 }))
    }
    const job = await jobModel.create(req.body)
    return res.status(201).json({ message: "Done", job })
})

// update job  
export const updateJob = asyncHandller(async (req, res, next) => {
    const { jobId } = req.params
    if (!await jobModel.findById(jobId)) {
        return next(new Error("no job id found", { cause: 404 }))
    }
    req.body.companyHR = req.user._id
    if (req.body.companyHR != req.user._id) {
        return next(new Error("user not authoized", { cause: 409 }))
    }
    const newJob = await jobModel.findByIdAndUpdate({ _id: jobId }, req.body, { new: true })
    return res.status(200).json({ message: "done", job: newJob })
})

// delete company data  
export const deleteJob = asyncHandller(
    async (req, res, next) => {
        const { jobId } = req.params
        const job = await jobModel.findByIdAndDelete(jobId);
        if (!job) {
            return next(new Error('job not found', { cause: 404 }));
        }
        return res.status(200).json({ message: `job deleted successfully` })
    })

// Get all Jobs with their company’s information.
export const getAllJob = asyncHandller(
    async (req, res, next) => {
        const job = await jobModel.find().populate([
            {
                path: "companyId"
            }
        ])
        return res.status(200).json({ message: "Done", job })
    })

// Get all Jobs for a specific company 
export const getSpacificJob = asyncHandller(async (req, res, next) => {
    const { companyName } = req.query;
    const company = await companyModel.findOne({ companyName })
    if (!company) {
        return res.status(404).json({ message: "No company found" });
    }
    const job = await jobModel.find({ companyId: company._id })
    return res.status(200).json({ message: "done", job });
})

//Get all Jobs that match the following filters 
export const getJopsWithFilters = asyncHandller(
    async (req, res, next) => {
        const apiFeatures = new ApiFeatures(jobModel.find(), req.query).search().filter().paginate();
        const jobs = await apiFeatures.mongooseQuery;
        res.status(200).json({ message: "done", count: jobs.length, data: jobs });
    });

//apply to job
export const applyJob = asyncHandller(async (req, res, next) => {
    const job = await jobModel.findOne({ jobTitle: req.body.jobTitle });
    if (!job) {
        return next(new Error("Job Not Found", { cause: 404 }));
    }
    req.body.userId = req.user._id
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/resume` })
    if (!secure_url) {
        return next(new Error("pdf not found", { cause: 400 }))
    }
    req.body.userResume = { public_id, secure_url }
    const resume = await applicationModel.create(req.body)
    return res.status(200).json({ message: "Done", resume })
})








