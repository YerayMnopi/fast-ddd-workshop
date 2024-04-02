import CompaniesRepository from './repositories/companies-repository.js';
import JobPostingRepository from './repositories/job-postings-repository.js';
import { AppSettings, DbSettings, ServerSettings } from './settings.js';

const appSettings = new AppSettings();
const serverSettings = new ServerSettings();
const dbSettings = new DbSettings();
const companyRepository = new CompaniesRepository(dbSettings.connection);
const jobPostingRepository = new JobPostingRepository(dbSettings.connection);

export default {
    AppSettings: appSettings,
    ServerSettings: serverSettings,
    DbSettings: dbSettings,
    CompanyRepository: companyRepository,
    JobPostingRepository: jobPostingRepository
};
