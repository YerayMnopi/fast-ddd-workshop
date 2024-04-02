import {
    type BulkWriteResult,
    type Collection,
    type Db,
    type UpdateOneModel,
} from 'mongodb';
import { JobPosting } from '../../domain/job-posting.js';

export default class JobPostingRepository {
    private readonly collection: Collection<JobPosting>;
    private readonly collectionName = 'job-postings';

    constructor(dbConnection: Db) {
        this.collection = dbConnection.collection(this.collectionName);
    }

    async upsertMany(jobPostings: JobPosting[]): Promise<BulkWriteResult> {
        const operations: Array<{ updateOne: UpdateOneModel<JobPosting> }> =
            jobPostings.map((jobPosting) => ({
                updateOne: {
                    filter: { identifier: jobPosting.identifier },
                    update: {
                        $set: jobPosting,
                    },
                    upsert: true,
                },
            }));
        return await this.collection.bulkWrite(operations);
    }

    async findAll(): Promise<JobPosting[]> {
        const cursor = this.collection.find();
        const jobPostings = [];

        for await (const doc of cursor) {
            jobPostings.push(
                new JobPosting(
                    doc.title,
                    doc.companyId,
                    doc.category,
                    doc.identifier,
                ),
            );
        }

        return jobPostings;
    }
}
