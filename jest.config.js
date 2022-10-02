module.exports = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  //roots: ["<rootDir>/src"],
  roots: ["<rootDir>"], 
  preset:'ts-jest',
  testEnvironment:'jsdom',
  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    //"^.+\\.tsx?$": "ts-jest",
    "^.+\\.(ts|tsx|js)$": "ts-jest"
    //'^.+\\.tsx?$': 'babel-jest'
  },

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: [
    "@testing-library/react/dont-cleanup-after-each",
    "@testing-library/jest-dom/extend-expect",
    '<rootDir>/__tests__/config/importJestDOM.ts'
  ],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: "(<rootDir>/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",

  // Module file extensions for importing
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};