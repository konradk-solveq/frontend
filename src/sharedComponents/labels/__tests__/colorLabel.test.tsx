import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import ColorLabel from '../colorLabel';
import {initAppSize} from '../../../../src/helpers/layoutFoo';

const textToPass = 'Label text';
const colorsToPass = ['red', 'blue'];

jest.mock('../../../utils/translations/useMergedTranslation', () => ({
    useMergedTranslation: (val: string) => {
        return {
            t: (str: string) => `${val}.${str}`,
        };
    },
}));

describe('<ColorLabel />', () => {
    describe('Rendering', () => {
        beforeAll(() => {
            initAppSize();
        });

        it('Should match snapshot', async () => {
            const component = await render(
                <ColorLabel text={textToPass} colors={colorsToPass} />,
            );
            expect(component).toMatchSnapshot();
        });

        it('Should match rendered text', async () => {
            const component = await render(
                <ColorLabel text={textToPass} colors={colorsToPass} />,
            );
            const textComponent = await component.getByText(textToPass);
            expect(textComponent).not.toBeNull();

            const textToCompare = textComponent.props.children;

            expect(textToCompare).toMatch(textToPass);
        });
    });
});
