const config = {
  verbose: true,
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
  },
  collectCoverage: true,
  coveragePathIgnorePatterns: ['src/js/utils/test-utils.js'],
};

module.exports = config;
