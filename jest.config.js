export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'vue'],
    transform: {
        '^.+\\.vue$': '@vue/vue3-jest',
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: 'tsconfig.json',
            babelConfig: true,
        }],
    },
    testMatch: [
        '**/tests/unit/**/*.spec.[jt]s?(x)',
        '**/__tests__/*.[jt]s?(x)',
    ],
    moduleNameMapper: {
        "^@vue/test-utils": "<rootDir>/node_modules/@vue/test-utils/dist/vue-test-utils.cjs.js"
    }
};
