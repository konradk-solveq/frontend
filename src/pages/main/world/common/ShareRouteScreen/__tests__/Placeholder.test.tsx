import React from 'react';
import {Text, View} from 'react-native';
import {render} from '@testing-library/react-native';

import {initAppSize} from '@helpers/layoutFoo';

import asyncEvent from '@jestUtils/asyncEvent';
import Placeholder from '../Placeholder';

const testID = 'placeholder-test-id';

const layout = {width: 100, height: 100};

interface TestComponentPropsI {
    showPlaceholder: boolean;
    colors?: {
        backgroundColor: string;
        highlightColor: string;
    };
}

const TestComponent = ({showPlaceholder, colors}: TestComponentPropsI) => (
    <Placeholder
        testID={testID}
        showPlaceholder={showPlaceholder}
        layout={layout}
        backgroundColor={colors?.backgroundColor}
        highlightColor={colors?.highlightColor}>
        <View>
            <Text>TestComponent</Text>
        </View>
    </Placeholder>
);

describe('<Placeholder />', () => {
    beforeAll(() => {
        initAppSize();
    });

    describe('Rendering', () => {
        it('Should not render placeholder', async () => {
            const component = render(<TestComponent showPlaceholder={false} />);

            const placeholderComponent = component.queryByTestId(testID);
            expect(placeholderComponent).toBeNull();
        });

        it('Should render placeholder', async () => {
            const component = render(<TestComponent showPlaceholder={true} />);

            const placeholderComponent = component.getByTestId(testID);
            expect(placeholderComponent).not.toBeNull();
        });

        it('Should render placeholder with passed colors', async () => {
            const component = render(
                <TestComponent
                    showPlaceholder={true}
                    colors={{
                        backgroundColor: 'red',
                        highlightColor: 'blue',
                    }}
                />,
            );

            const componentWithBackgrounColor = component.getByTestId(
                `${testID}-background-color`,
            );
            expect(componentWithBackgrounColor).not.toBeNull();
            /**
             * Styles are merged inside the component
             */
            expect(componentWithBackgrounColor.props.style[1]).toHaveProperty(
                'backgroundColor',
                'red',
            );

            const componentWithHighlightedColor = component.getByTestId(
                `${testID}-highlight-color`,
            );
            expect(componentWithHighlightedColor).not.toBeNull();
            /**
             * Styles are merged inside the component
             */
            expect(componentWithHighlightedColor.props.style[1]).toHaveProperty(
                'backgroundColor',
                'blue',
            );
        });

        afterEach(() => {
            jest.resetModules();
        });
    });
});
