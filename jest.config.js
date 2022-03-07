module.exports = {
    preset: 'react-native',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['./jest.setup.js'],
    moduleNameMapper: {
        '^@hooks(.*)$': '<rootDir>/src/hooks$1',
    },
    modulePathIgnorePatterns: [
        './jest.setup.js',
        '__tests__/utils',
        '__tests__/mocks',
        '__tests__/__mocks__',
        '.history',
    ],
    globals: {
        window: {},
    },
    transformIgnorePatterns: [
        'node_modules/(?!(@react-native|react-native|react-(native|universal|navigation)-(.*)|@react-native-community/(.*)|@react-navigation/(.*)|bs-platform|@rootstrap/redux-tools|@sentry/react-native|rn-range-slider)/)',
    ],
};