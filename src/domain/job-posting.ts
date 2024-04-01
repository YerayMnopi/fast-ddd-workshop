import { v4 as uuidv4 } from 'uuid';

/**
 * Entity representing a job posting.
 */
export class JobPosting {
    identifier: string;
    title: string;
    description: string;
    companyId: string;
    applications: Application[];

    constructor(
        title: string,
        description: string,
        companyId: string,
        applications: Application[],
    ) {
        this.title = title;
        this.description = description;
        this.companyId = companyId;
        this.identifier = uuidv4();
        this.applications = applications;
    }
}

export class Application {
    candidateId: string;
    dateCreated: Date;

    constructor(candidateId: string) {
        this.candidateId = candidateId;
        this.dateCreated = new Date();
    }
}
