const fs = require('fs');
const nextJest = require('next/jest');
const { parse: parseJsonWithComments } = require('comment-json');

const createJestConfig = nextJest({
  dir: './',
});

const getTsConfigPathAliases = () => {
  const tsConfig = parseJsonWithComments(
    fs.readFileSync('./tsconfig.json', 'utf-8')
  );

  return Object.entries(tsConfig.compilerOptions.paths).reduce(
    (aliases, [alias, aliasPaths]) => {
      const newAlias = `^${alias.replace('/*', '')}(.*)$`;
      const newAliasPath = `<rootDir>/${aliasPaths[0].replace('/*', '')}$1`;

      return {
        ...aliases,
        [newAlias]: newAliasPath,
      };
    },
    {}
  );
};

module.exports = createJestConfig({
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.test.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!.next/**',
    '!jest.config.js',
    '!jest.setup.js',
    '!coverage/**',
    '!.eslintrc.js',
    '!next.config.js',
    '!postcss.config.js',
    '!tailwind.config.js',
  ],
  moduleNameMapper: {
    ...getTsConfigPathAliases(),
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
});
