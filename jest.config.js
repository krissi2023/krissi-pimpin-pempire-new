/** @type {import('jest').Config} */
module.exports = {
  rootDir: __dirname,
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/diamondz-playhouse/frontend/'],
  moduleFileExtensions: ['js', 'json'],
  cacheDirectory: '<rootDir>/.jest-cache'
};
