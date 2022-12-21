import type { Config } from '@jest/types';

// Sync object
export const config: Config.InitialOptions = {
  verbose: true
};

// Or async function
export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    roots: ['<rootDir>/src', '<rootDir>/tests'],
    transform: {
      '^.+\\.ts?$': 'ts-jest'
    },
    coverageThreshold: {
      global: {
        lines: 0,
        statements: 0,
        branches: 0,
        functions: 0
      }
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx']
  };
};
