import { JobPosting } from '../domain/job-posting.js';
import type CompaniesRepository from '../infrastructure/repositories/companies-repository.js';
import type JobPostingRepository from '../infrastructure/repositories/job-postings-repository.js';

export class PublishJobPostingHandler {
    companiesRepository: CompaniesRepository;
    jobPostingRepository: JobPostingRepository;

    constructor(
        companiesRepository: CompaniesRepository,
        jobPostingRepository: JobPostingRepository,
    ) {
        this.companiesRepository = companiesRepository;
        this.jobPostingRepository = jobPostingRepository;
    }

    async handle(companyId: string, title: string): Promise<JobPosting> {
        const company = await this.companiesRepository.findById(companyId);
        const jobPosting = new JobPosting(title, company.identifier);
        await this.jobPostingRepository.upsertMany([jobPosting]);
        return jobPosting;
    }
}
