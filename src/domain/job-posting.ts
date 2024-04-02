import { v4 as uuidv4 } from 'uuid';

/**
 * Entity representing a job posting.
 */
export class JobPosting {
    identifier: string;
    title: string;
    companyId: string;

    constructor (
        title: string,
        companyId: string,
        identifier?: string
    ) {
        this.title = title;
        this.companyId = companyId;
        this.identifier = identifier ?? uuidv4();
    }
}
