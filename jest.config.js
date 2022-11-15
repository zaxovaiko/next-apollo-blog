const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['<rootDir>/__tests__/tests-setup.ts'],
  testMatch: ['<rootDir>/__tests__/**/*.test.ts?(x)'],
};

module.exports = createJestConfig(customJestConfig);
