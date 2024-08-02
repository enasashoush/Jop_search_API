import { Router } from 'express'
import { validation } from './../../middleware/validation.js';
import authen, { roles } from '../../middleware/auth.js';
import * as userValidation from './controller/user.validation.js'
import * as userController from './controller/user.controller.js'
import companyEndPoints from './controller/user.endpoint.js';
const router = Router()

router
    // update user 
    .put('/',
        validation(userValidation.tokenSchema, true),
        validation(userValidation.updateUserSchema),
        authen(companyEndPoints.update),
        userController.updateUser)

    // delete user 
    .delete('/deleteUser',
        validation(userValidation.tokenSchema, true),
        authen(companyEndPoints.delete),
        userController.deleteUser)

    // get User Data
    .get('/getUser',
        validation(userValidation.tokenSchema, true),
        authen(companyEndPoints.update),
        userController.getUserData)

    //Get profile data for another user 
    .get('/getProfiles/:_id',
        validation(userValidation.getOtherProfilesDataSchema),
        userController.getOtherProfilesData)

    //Get all accounts associated to a specific recovery Email 
    .get('/getRecoveryEmail/:recoveryEmail',
        validation(userValidation.getAccountsByRecoveryEmailSchema),
        userController.getAccountsByRecoveryEmail)


export default router