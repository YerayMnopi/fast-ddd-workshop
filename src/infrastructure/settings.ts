import { type Db, MongoClient } from 'mongodb';

export class AppSettings {
    name = 'Job Postings';
}

/**
 * Application global settings.
 */
export class ServerSettings {
    port: number = process.env.PORT != null ? parseInt(process.env.PORT) : 3000;
    host: string = 'localhost';
}

/**
 * Settings related to the database
 */
export class DbSettings {
    private readonly uri = process.env.DB_URI ?? 'mongodb://localhost:27017';
    private readonly dbName = process.env.DB_NAME ?? 'job_postings';
    private readonly client: MongoClient;

    constructor () {
        this.client = new MongoClient(this.uri);
    }

    get connection (): Db {
        return this.client.db(this.dbName);
    }
}
