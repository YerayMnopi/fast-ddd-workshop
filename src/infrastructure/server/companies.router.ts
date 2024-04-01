import { Router, type Request, type Response } from 'express';
import type CompanyRepository from '../repositories/company-repository.js';
import dependencies from '../dependencies.js';

const companiesRouter = Router();
export const companiesPath = '/companies';

companiesRouter.route('/').get(async (req: Request, res: Response) => {
    const companyRepository: CompanyRepository = dependencies.CompanyRepository;
    const companies = await companyRepository.findAll();
    return res.send(companies);
});

export default companiesRouter;
