import CompanyRepository from './repositories/company-repository.js';
import { AppSettings, DbSettings, ServerSettings } from './settings.js';

const appSettings = new AppSettings();
const serverSettings = new ServerSettings();
const dbSettings = new DbSettings();
const companyRepository = new CompanyRepository(dbSettings.connection);

export default {
    AppSettings: appSettings,
    ServerSettings: serverSettings,
    DbSettings: dbSettings,
    CompanyRepository: companyRepository,
};
