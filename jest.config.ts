import type { Config } from 'jest';
import nextJest from 'next/jest.js';
import { pathsToModuleNameMapper } from 'ts-jest';
import fs from 'node:fs';
import path from 'node:path';

const tsconfigPath = path.resolve(__dirname, 'tsconfig.json');
const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));
const compilerOptions = tsconfig.compilerOptions ?? {};

const createJestConfig = nextJest({ dir: './' });

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleNameMapper: compilerOptions.paths
    ? pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
      })
    : {},
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default createJestConfig(config);
