export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    '^.+\\.css$': '<rootDir>/identity-obj-proxy-transformer.cjs',
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
