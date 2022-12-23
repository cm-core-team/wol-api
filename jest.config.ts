/** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//     preset: "ts-jest",
//     testEnvironment: "node",
//     extensionsToTreatAsEsm: [".ts"],
//     resolver: "jest-ts-webcompat-resolver",
// };

import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    globals: {
        "ts-jest": {
            useESM: true,
        },
    },
    preset: "ts-jest/presets/default-esm",
    roots: ["tests/"],
    modulePathIgnorePatterns: ["<rootDir>/node_modules/"],
};

export default config;
