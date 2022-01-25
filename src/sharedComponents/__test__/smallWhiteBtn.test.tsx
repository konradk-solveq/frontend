import 'react-native';
import React from 'react';
import {fireEvent} from '@testing-library/react-native';

import {initAppSize} from '@helpers/layoutFoo';

import SmallWhiteBtn from '@sharedComponents/buttons/SmallWhiteBtn';
import renderComponent from '@jestUtils/render';
import asyncEvent from '@jestUtils/asyncEvent';

jest.mock('../../utils/translations/useMergedTranslation', () => ({
    useMergedTranslation: (val: string) => {
        return {
            t: (str: string) => `${val}.${str}`,
        };
    },
}));

describe('<SmallWhiteBtn />', () => {
    describe('Rendering', () => {
        beforeAll(() => {
            initAppSize();
        });

        it('Should match snapshot', async () => {
            const component = await asyncEvent(
                renderComponent(
                    <SmallWhiteBtn title="Test" onPress={() => {}} />,
                ),
            );

            expect(component).toMatchSnapshot();
        });

        it('Should match snapshot - with onPress', async () => {
            const onPressFun = jest.fn();
            const component = await asyncEvent(
                renderComponent(
                    <SmallWhiteBtn onPress={onPressFun} title="Test" />,
                ),
            );

            expect(component).toMatchSnapshot();
        });

        it('Should fire onPressEvent', async () => {
            const onPressFun = jest.fn();

            const component = await asyncEvent(
                renderComponent(
                    <SmallWhiteBtn onPress={onPressFun} title="Test" />,
                ),
            );

            const smallWhiteBtn = component.getByTestId('small-white-btn');
            await asyncEvent(fireEvent.press(smallWhiteBtn));

            expect(onPressFun).toBeCalled();

            expect(component).toMatchSnapshot();
        });

        afterEach(() => {
            jest.restoreAllMocks();
            jest.clearAllMocks();
        });
    });
});
