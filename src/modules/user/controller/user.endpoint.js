import { roles } from "../../../middleware/auth.js"

const companyEndPoints = {
    update:[roles.User],
    delete:[roles.User],
    get: [roles.Company_HR, roles.User]
}

export default companyEndPoints