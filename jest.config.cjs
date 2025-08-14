const nextJest = require('next/jest');
const { pathsToModuleNameMapper } = require('ts-jest');
const fs = require('node:fs');
const path = require('node:path');

const tsconfigPath = path.resolve(__dirname, 'tsconfig.json');
const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));
const compilerOptions = tsconfig.compilerOptions ?? {};

const createJestConfig = nextJest({ dir: './' });

const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleNameMapper: compilerOptions.paths
    ? pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' })
    : {},
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

module.exports = createJestConfig(config);
