
import { asyncHandller } from '../../../utlis/asyncHandler.js';
import slugify from 'slugify';
import companyModel from './../../../DB/models/Company.model.js';
import applicationModel from './../../../DB/models/Application.model.js';
import { ApiFeatures } from '../../../utlis/apiFeatures.js';
import jobModel from './../../../DB/models/Job.model.js';


// create company 
export const createCompany = asyncHandller(async (req, res, next) => {
    const { companyName, companyEmail } = req.body
    if (await companyModel.findOne({ companyName, companyEmail })) {
        return next(new Error("company companyName or companyEmail already exists", { cause: 409 }))
    }
    req.body.slug = slugify(`${companyName}`)
    req.body.companyHR = req.user._id
    const company = await companyModel.create(req.body)
    return res.status(201).json({ message: "Done", company })
})

// update company 
export const updateCompany = asyncHandller(async (req, res, next) => {
    const { companyId } = req.params
    const companyExists = await companyModel.findById({ _id: companyId })
    if (!companyExists) {
        return next(new Error("invalid company id", { cause: 404 }))
    }
    if (req.body.companyName) {
        if (await companyModel.findOne({ companyName: req.body.companyName })) {
            return next(new Error(" companyName already exist", { cause: 409 }))
        }
        req.body.slug = slugify(req.body.companyName)
    }
    if (req.body.companyHR != req.user._id) {
        return next(new Error("user not authoized", { cause: 409 }))
    }
    if (String(companyExists.companyHR) !== String(req.user._id)) {
        return next(
            new Error("You are not authorized to update this job", { cause: 403 })
        );
    }
    const newCompany = await companyModel.findByIdAndUpdate({ _id: companyId }, req.body, { new: true })
    return res.status(200).json({ message: "done", company: newCompany })
})

// delete company data  
export const deleteCompany = asyncHandller(
    async (req, res, next) => {
        const { companyId } = req.params
        const company = await companyModel.findById(companyId);
        if (!company) {
            return next(new Error('company not found', { cause: 404 }));
        }
        if (company?.isDeleted == true) {
            return next(new Error("company is deleted", { cause: 404 }));
        }
        if (req.body.companyHR != req.user._id) {
            return next(new Error("user not authoized", { cause: 409 }))
        }
        if (String(company.companyHR) !== String(req.user._id)) {
            return next(
                new Error("You are not authorized to update this job", { cause: 403 })
            );
        }
        const companyDeleted = await companyModel.findOneAndDelete(company)
        return res.status(200).json({ message: `company's data deleted successfully` })
    })

// get company by ID
export const getIdCompany = asyncHandller(async (req, res, next) => {
    const { companyId } = req.params
    const company = await companyModel.findOne({ _id: companyId, isDeleted: false }).populate([
        {
            path: "Job"
        }
    ])
    if (!company) {
        return next(new Error("company not exist", { cause: 404 }));
    }
    return res.status(200).json({ message: "done", company })
})

//Search for a company with a name. 
export const searchCompanyName = asyncHandller(
    async (req, res, next) => {
        const apiFeatures = new ApiFeatures(companyModel.find(), req.query).search()
        const companies = await apiFeatures.mongooseQuery;
        return res.status(200).json({ message: "done", data: companies });
    }
)

// get All company 
export const getAllCompany = asyncHandller(async (req, res, next) => {
    const company = await companyModel.find().populate([
        {
            path: "Job"
        }
    ])
    return res.status(200).json({ message: "done", company })
})

//Get all applications for specific Job
export const getSpacificApplication = asyncHandller(
    async (req, res, next) => {
        const { companyId } = req.params;
        const jobsFound = await jobModel.find({ companyId });
        if (!jobsFound) {
            return next(new Error("Jobs not found", { cause: 404 }));
        }
        const applications = await applicationModel.find({ jobId: { $in: jobsFound.map(job => job._id) } })
            .populate([{
                path: "User"
            }])
        return res.status(200).json({ message: "Done", applications });
    }
);