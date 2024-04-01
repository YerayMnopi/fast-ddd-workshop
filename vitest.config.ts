import tsconfigPaths from 'vite-tsconfig-paths'; // only if you are using custom tsconfig paths
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {},
    plugins: [tsconfigPaths()],
});

process.env["DB_NAME"] = "job_posting_tests"