import {LOAD_STORYBOOK} from '@env';

let StorybookUIRoot = () => null;

if (LOAD_STORYBOOK === 'true' && __DEV__) {
    const {
        configure,
        addDecorator,
        getStorybookUI,
    } = require('@storybook/react-native');
    const {withKnobs} = require('@storybook/addon-knobs');
    require('./rn-addons');
    // enables knobs for all stories
    addDecorator(withKnobs);

    // import stories
    configure(() => {
        require('./stories');
    }, module);
    StorybookUIRoot = getStorybookUI({
        asyncStorage: null,
    });
}

export default StorybookUIRoot;
