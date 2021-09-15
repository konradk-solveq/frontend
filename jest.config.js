module.exports = {
    preset: 'react-native',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFiles: ['./jest.setup.js'],
    modulePathIgnorePatterns: [
        './jest.setup.js',
        '__tests__/utils',
        // '__test__/mocks',
    ],
    globals: {
        window: {},
    },
    transformIgnorePatterns: [
        'node_modules/(?!(@react-native|react-native|react-(native|universal|navigation)-(.*)|@react-native-community/(.*)|@react-navigation/(.*)|bs-platform|@rootstrap/redux-tools)/)',
    ],
};
