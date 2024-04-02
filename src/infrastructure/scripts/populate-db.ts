import dependencies from '../dependencies.js';
import companies from '../fixtures/companies.js';
import { logger } from '../logger.js';
import type CompaniesRepository from '../repositories/companies-repository.js';

class PopulateDBScript {
    companyRepository: CompaniesRepository;

    constructor(companyRepository: CompaniesRepository) {
        this.companyRepository = companyRepository;
    }

    async run(): Promise<void> {
        logger.info('PopulateDB script started');
        const result = await this.companyRepository.upsertMany(companies);
        logger.info(result);
        logger.info('PopulateDB script finished');
    }
}

const runPopulateDbScript = async (): Promise<void> => {
    const companyRepository = dependencies.CompanyRepository;

    const script = new PopulateDBScript(companyRepository);

    await script.run();
};

await runPopulateDbScript();
