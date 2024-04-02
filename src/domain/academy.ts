import { v4 } from 'uuid';
import { type JobPosting } from './job-posting.js';

/**
 * Aggregate
 */
export class Academy {
    identifier: string;
    name: string;
    jobPostingFilter: string;
    jobPostings: JobPosting[];
    // totalJobPostings: number;

    constructor(
        name: string,
        jobPostingFilter: string,
        jobPostings: JobPosting[],
        identifier?: string,
    ) {
        this.name = name;
        this.jobPostingFilter = jobPostingFilter;
        this.jobPostings = jobPostings;
        this.identifier = identifier ?? v4();
    }

    addJobPosting(jobPosting: JobPosting): void {
        if (jobPosting.category === this.jobPostingFilter) {
            this.jobPostings.push(jobPosting);
        }
    }
}
