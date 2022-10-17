/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.(ts|tsx|js)$": "ts-jest"
  },
  setupFilesAfterEnv: [
    "@testing-library/react/dont-cleanup-after-each",
    "@testing-library/jest-dom/extend-expect",
    '<rootDir>/__tests__/config/importJestDOM.ts'
  ],
  testRegex: "(<rootDir>/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  'moduleNameMapper': { 'src/(.*)': '<rootDir>/src/$1' },
  'moduleDirectories': ['node_modules', 'src'],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  globals: {
    "ts-jest": {
      tsconfig: {
        jsx: 'react-jsx'
      }
    }
  }
};
