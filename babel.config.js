module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        ['@babel/plugin-proposal-decorators', {legacy: true}],
        [
            'module:react-native-dotenv',
            {
                moduleName: '@env',
            },
        ],
        'react-native-reanimated/plugin',
    ],
};
