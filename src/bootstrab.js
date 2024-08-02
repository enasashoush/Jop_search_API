import connection from './DB/connection.js';
import companyRouter from './modules/company/company.router.js'
import jobRouter from './modules/job/job.router.js'
import authRouter from './modules/auth/auth.router.js'
import userRouter from './modules/user/user.router.js'
import { globalError } from './utlis/asyncHandler.js';

const bootstrap = (app, express) => {

    app.use(express.json());
    app.use('/company', companyRouter);
    app.use('/job', jobRouter);
    app.use('/auth', authRouter);
    app.use('/user', userRouter);

    app.use(globalError);
    connection()
}

export default bootstrap;