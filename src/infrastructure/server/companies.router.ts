import { Router, type Request, type Response } from 'express';
import type CompanyRepository from '../repositories/companies-repository.js';
import dependencies from '../dependencies.js';
import { PublishJobPostingHandler } from '../../application/publish-job-posting.js';
import bodyParser from 'body-parser';

const companiesRouter = Router();
export const companiesPath = '/companies';

companiesRouter.route('/').get(async (req: Request, res: Response) => {
    const companyRepository: CompanyRepository = dependencies.CompanyRepository;
    const companies = await companyRepository.findAll();
    return res.send(companies);
});

companiesRouter.post(
    '/:companyId/job-postings',
    bodyParser.json(),
    async (
        req: Request<{ companyId: string }, any, { title: string }>,
        res: Response,
    ) => {
        const companyId = req.params.companyId;
        const handler = new PublishJobPostingHandler(
            dependencies.CompanyRepository,
            dependencies.JobPostingRepository,
        );
        const jobPosting = await handler.handle(companyId, req.body.title);
        return res.send(jobPosting);
    },
);

export default companiesRouter;
