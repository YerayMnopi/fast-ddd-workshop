import {
    type BulkWriteResult,
    type Collection,
    type Db,
    type UpdateOneModel
} from 'mongodb';
import { Company } from '../../domain/company.js';

export default class CompaniesRepository {
    private readonly collection: Collection<Company>;
    private readonly collectionName = 'companies';

    constructor (dbConnection: Db) {
        this.collection = dbConnection.collection(this.collectionName);
    }

    async upsertMany (companies: Company[]): Promise<BulkWriteResult> {
        const operations: Array<{ updateOne: UpdateOneModel<Company> }> =
            companies.map((company) => ({
                updateOne: {
                    filter: { identifier: company.identifier },
                    update: {
                        $set: company
                    },
                    upsert: true
                }
            }));
        return await this.collection.bulkWrite(operations);
    }

    async findAll (): Promise<Company[]> {
        const cursor = this.collection.find();
        const companies = [];

        for await (const doc of cursor) {
            companies.push(
                this.fromDocToEntity(doc)
            );
        }

        return companies;
    }

    async findById (id: string): Promise<Company> {
        const doc = await this.collection.findOne({ identifier: id });
        if (doc == null) {
            throw new Error('Company not found');
        }
        return this.fromDocToEntity(doc);
    }

    private fromDocToEntity (doc: Company): Company {
        return new Company(doc.name, doc.cif.value, doc.identifier);
    }
}
