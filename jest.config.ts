/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    extensionsToTreatAsEsm: [".ts"],
    resolver: "jest-ts-webcompat-resolver",
    globals: {
        "ts-jest": { useEsm: true },
    },
};
