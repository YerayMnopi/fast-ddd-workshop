import {
    type BulkWriteResult,
    type Collection,
    type Db,
    type UpdateOneModel
} from 'mongodb';
import { Student } from '../../domain/student.js';

export default class JobPostingRepository {
    private readonly collection: Collection<Student>;
    private readonly collectionName = 'job-postings';

    constructor (dbConnection: Db) {
        this.collection = dbConnection.collection(this.collectionName);
    }

    async upsertMany (companies: Student[]): Promise<BulkWriteResult> {
        const operations: Array<{ updateOne: UpdateOneModel<Student> }> =
            companies.map((student) => ({
                updateOne: {
                    filter: { identifier: student.identifier },
                    update: {
                        $set: student
                    },
                    upsert: true
                }
            }));
        return await this.collection.bulkWrite(operations);
    }

    async findAll (): Promise<Student[]> {
        const cursor = this.collection.find();
        const companies = [];

        for await (const doc of cursor) {
            companies.push(
                new Student(doc.name, doc.email.value, doc.identifier)
            );
        }

        return companies;
    }
}
