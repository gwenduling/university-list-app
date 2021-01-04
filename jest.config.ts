// jest.config.ts
import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
};
export default config;

module.exports = {
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/jest/style-mock.js",
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
  collectCoverage: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "**/src/components/*.{ts,tsx}",
    "**/src/pages/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/src/data/*",
    "!**/jest/*",
    "!**/jest.config.ts",
    "!**/src/index.tsx",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest/setup-test.ts"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
};
