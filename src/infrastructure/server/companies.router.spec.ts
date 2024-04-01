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
            { ...companies[0], cif: { ...companies[0].cif } },
        ]);
    });
});
