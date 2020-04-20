module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  // testMatch: [
  //   "**/tests/**/*.+(ts|tsx|js)",
  //   "**/?(*.)+(spec|test).+(ts|tsx|js)",
  // ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testPathIgnorePatterns: ["node_modules"],
};
