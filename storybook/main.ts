// .storybook/main.js

module.exports = {
    typescript: {
        check: false,
        checkOptions: {},
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop: {parent: {fileName: string}}) =>
                prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
        },
    },
};
