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
        [
            'babel-plugin-root-import',
            {
                paths: [
                    {
                        rootPathSuffix: './src',
                        rootPathPrefix: '@src',
                    },
                    {
                        rootPathSuffix: './src/api',
                        rootPathPrefix: '@api',
                    },
                    {
                        rootPathSuffix: './src/assets',
                        rootPathPrefix: '@assets',
                    },
                    {
                        rootPathSuffix: './src/enums',
                        rootPathPrefix: '@enums',
                    },
                    {
                        rootPathSuffix: './src/helpers',
                        rootPathPrefix: '@helpers',
                    },
                    {
                        rootPathSuffix: './src/hooks',
                        rootPathPrefix: '@hooks',
                    },
                    {
                        rootPathSuffix: './src/interfaces',
                        rootPathPrefix: '@interfaces',
                    },
                    {
                        rootPathSuffix: './src/models',
                        rootPathPrefix: '@models',
                    },
                    {
                        rootPathSuffix: './src/navigation',
                        rootPathPrefix: '@navigation',
                    },
                    {
                        rootPathSuffix: './src/pages',
                        rootPathPrefix: '@pages',
                    },
                    {
                        rootPathSuffix: './src/services',
                        rootPathPrefix: '@services',
                    },
                    {
                        rootPathSuffix: './src/sharedComponents',
                        rootPathPrefix: '@sharedComponents',
                    },
                    {
                        rootPathSuffix: './src/storage',
                        rootPathPrefix: '@storage',
                    },
                    {
                        rootPathSuffix: './src/types',
                        rootPathPrefix: '@types',
                    },
                    {
                        rootPathSuffix: './src/utils',
                        rootPathPrefix: '@utils',
                    },
                    {
                        rootPathSuffix: './I18n',
                        rootPathPrefix: '@translations',
                    },
                ],
            },
        ],
    ],
    env: {
        production: {
            plugins: [
                'transform-remove-console',
                'babel-plugin-root-import',
                {
                    paths: [
                        {
                            rootPathSuffix: './src',
                            rootPathPrefix: '@',
                        },
                    ],
                },
            ],
        },
    },
};
