import { roles } from "../../../middleware/auth.js"


const companyEndPoints = {
    create:[roles.Company_HR],
    update:[roles.Company_HR],
    delete:[roles.Company_HR],
    get: [roles.Company_HR, roles.User],
    user: [roles.User]
}

export default companyEndPoints