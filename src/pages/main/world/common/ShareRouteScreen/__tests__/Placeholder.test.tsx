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
}

const TestComponent = ({showPlaceholder}: TestComponentPropsI) => (
    <Placeholder
        testID={testID}
        showPlaceholder={showPlaceholder}
        layout={layout}>
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
            const component = await asyncEvent(
                render(<TestComponent showPlaceholder={true} />),
            );

            const placeholderComponent = component.getByTestId(testID);
            expect(placeholderComponent).not.toBeNull();
        });

        afterEach(() => {
            jest.resetModules();
        });
    });
});
