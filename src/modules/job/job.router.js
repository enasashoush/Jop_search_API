import { Router } from 'express'
import { validation } from '../../middleware/validation.js'
import * as jobController from './controller/job.controller.js'
import * as jobValidation from './controller/job.validation.js'
import authen from '../../middleware/auth.js';
import jobEndPoints from './controller/job.endpoint.js';
import { fileValidation, uploadFile } from './../../utlis/cloudinaryMulter.js';

const router = Router()

router
  // create job
  .post('/addJob',
    validation(jobValidation.tokenSchema, true),
    authen(jobEndPoints.create),
    validation(jobValidation.createJobSchema),
    jobController.createJob)

  // update job
  .put('/:jobId',
    validation(jobValidation.tokenSchema, true),
    authen(jobEndPoints.update),
    validation(jobValidation.updateJobSchema),
    jobController.updateJob)

  // delete job 
  .delete('/:jobId',
    validation(jobValidation.tokenSchema, true),
    authen(jobEndPoints.delete),
    validation(jobValidation.deleteJobSchema),
    jobController.deleteJob)

  // Get all Jobs with company data
  .get('/getAll',
    validation(jobValidation.tokenSchema, true),
    authen(jobEndPoints.get),
    jobController.getAllJob)

  // Get all Jobs for a specific company
  .get('/getSpacific',
    validation(jobValidation.tokenSchema, true),
    authen(jobEndPoints.get),
    jobController.getSpacificJob)

  // get filtered jobs
  .get('/filterJob',
    validation(jobValidation.tokenSchema, true),
    authen(jobEndPoints.get),
    jobController.getJopsWithFilters
  )

  // apply for job
  .post('/applyJob',
    validation(jobValidation.tokenSchema, true),
    authen(jobEndPoints.user),
    uploadFile(fileValidation.pdf).single('file'),
    validation(jobValidation.applyJobSchema),
    jobController.applyJob)

export default router