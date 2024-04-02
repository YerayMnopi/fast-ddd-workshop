import { v4 } from 'uuid';
import { type Student } from './student.js';
import { type JobPosting } from './job-posting.js';

/**
 * Aggregate
 */
export class Academy {
    identifier: string;
    name: string;
    jobPostingFilter: string;
    jobPostings: JobPosting[];
    students: Student[];

    constructor(
        name: string,
        jobPostingFilter: string,
        jobPostings: JobPosting[],
        students: Student[],
        identifier?: string,
    ) {
        this.name = name;
        this.jobPostingFilter = jobPostingFilter;
        this.jobPostings = jobPostings;
        this.students = students;
        this.identifier = identifier ?? v4();
    }
}
