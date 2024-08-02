import { Router } from 'express'
import { validation } from '../../middleware/validation.js'
import * as companyController from './controller/company.controller.js'
import * as companyValidation from './controller/company.validation.js'
import authen from '../../middleware/auth.js';
import companyEndPoints from './controller/company.endpoint.js';

const router = Router()

router
  // create company
  .post('/',
    validation(companyValidation.tokenSchema, true),
    validation(companyValidation.createCompanySchema),
    authen(companyEndPoints.create),
    companyController.createCompany)

  // update company
  .put('/:companyId',
    validation(companyValidation.tokenSchema, true),
    authen(companyEndPoints.update),
    validation(companyValidation.updateCompanySchema),
    companyController.updateCompany)

  // delete company 
  .delete('/:companyId',
    validation(companyValidation.tokenSchema, true),
    authen(companyEndPoints.delete),
    validation(companyValidation.deleteCompanySchema),
    companyController.deleteCompany)

  // get company by ID
  .get('/getCompanyId/:companyId',
    validation(companyValidation.getIdCompanySchema),
    validation(companyValidation.tokenSchema, true),
    authen(companyEndPoints.get),
    companyController.getIdCompany)

  // get All companys
  .get('/allCompany',
    companyController.getAllCompany)

  //Search for a company with a name.
  .get('/searchCompanyName',
    validation(companyValidation.tokenSchema, true),
    authen(companyEndPoints.search),
    companyController.searchCompanyName)

  // get all applicaation for spacific company
  .get('/getSpacificApplication/:companyId',
    validation(companyValidation.tokenSchema, true),
    authen(companyEndPoints.get),
    validation(companyValidation.applicationSchema),
    companyController.getSpacificApplication)



export default router