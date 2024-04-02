import { v4 as uuidv4 } from 'uuid';

/**
 * Entity representing a job posting.
 */
export class JobPosting {
    identifier: string;
    title: string;
    companyId: string;
    category: string;

    constructor(
        title: string,
        companyId: string,
        category: string,
        identifier?: string,
    ) {
        this.title = title;
        this.companyId = companyId;
        this.category = category;
        this.identifier = identifier ?? uuidv4();
    }
}
