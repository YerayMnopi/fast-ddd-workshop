import {
    type BulkWriteResult,
    type Collection,
    type Db,
    type UpdateOneModel,
} from 'mongodb';
import { Company } from '../../domain/company.js';

export default class CompanyRepository {
    private readonly collection: Collection<Company>;
    private readonly collectionName = 'companies';

    constructor(dbConnection: Db) {
        this.collection = dbConnection.collection(this.collectionName);
    }

    async upsertMany(companies: Company[]): Promise<BulkWriteResult> {
        const operations: Array<{ updateOne: UpdateOneModel<Company> }> =
            companies.map((company) => ({
                updateOne: {
                    filter: { identifier: company.identifier },
                    update: {
                        $set: company,
                    },
                    upsert: true,
                },
            }));
        return await this.collection.bulkWrite(operations);
    }

    async findAll(): Promise<Company[]> {
        const cursor = this.collection.find();
        const companies = [];

        for await (const doc of cursor) {
            companies.push(
                new Company(doc.name, doc.cif.value, doc.identifier),
            );
        }

        return companies;
    }
}
