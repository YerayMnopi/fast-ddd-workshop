import express, { type Express } from 'express';
import companiesRouter, { companiesPath } from './companies.router.js';
import dependencies from '../dependencies.js';

const serverSettings = dependencies.ServerSettings;
const server: Express = express();

server.use(companiesPath, companiesRouter);

server.listen(serverSettings.port, () => {
    console.log(
        `[server]: Server is running at http://${serverSettings.host}:${serverSettings.port}`
    );
});

export default server;
