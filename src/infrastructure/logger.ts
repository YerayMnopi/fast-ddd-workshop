import { pino } from 'pino';
import dependencies from './dependencies.js';

export const logger = pino({
    name: dependencies.AppSettings.name,
    level: 'debug',
});
