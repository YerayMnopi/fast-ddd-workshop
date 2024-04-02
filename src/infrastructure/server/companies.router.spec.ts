import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import app from './server.js';
import companies from '../fixtures/companies.js';
import dependencies from '../dependencies.js';

describe('GET /companies', function () {
    beforeEach(async () => {
        await dependencies.CompanyRepository.upsertMany(companies);
    });

    afterEach(async () => {
        await dependencies.DbSettings.connection.dropCollection('companies');
    });

    it('responds with json', async () => {
        const response = await request(app).get('/companies');

        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual([
            { ...companies[0], cif: { ...companies[0].cif } }
        ]);
    });
});

describe('POST /companies/:companyId/job-postings', () => {
    beforeEach(async () => {
        await dependencies.CompanyRepository.upsertMany(companies);
    });

    afterEach(async () => {
        await dependencies.DbSettings.connection.dropCollection('companies');
    });

    it('responds with json', async () => {
        const jobPostingTitle = 'test';
        const response = await request(app).post(`/companies/${companies[0].identifier}/job-postings`).send({ title: jobPostingTitle });

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toEqual(jobPostingTitle);
    });
});
