import 'react-native';
import React from 'react';
import {fireEvent} from '@testing-library/react-native';

import HomeContainer from '../HomeContainer';
import renderComponent from '@jestUtils/render';
import asyncEvent from '@jestUtils/asyncEvent';

const TEST_USER_NAME = 'User';
const BANNER_LINK = 'home-container-banner-link';

describe('<HomeContainer /> - containers/home/HomeContainer', () => {
    const onAddBikePressPrimary = jest.fn();
    const onAddBikePressSecondary = jest.fn();
    const onStoreTilePress = jest.fn();

    it('Should match snapshot', async () => {
        const component = await asyncEvent(
            renderComponent(
                <HomeContainer
                    userName={TEST_USER_NAME}
                    onAddBikePressPrimary={onAddBikePressPrimary}
                    onAddBikePressSecondary={onAddBikePressSecondary}
                    onStoreTilePress={onStoreTilePress}
                />,
            ),
        );

        expect(component).toMatchSnapshot();
    });

    it('Should access to banner button', async () => {
        const {getByTestId} = await asyncEvent(
            renderComponent(
                <HomeContainer
                    userName={TEST_USER_NAME}
                    onAddBikePressPrimary={onAddBikePressPrimary}
                    onAddBikePressSecondary={onAddBikePressSecondary}
                    onStoreTilePress={onStoreTilePress}
                />,
            ),
        );

        const bannerLink = getByTestId(BANNER_LINK);
        await asyncEvent(fireEvent.press(bannerLink));
        expect(onStoreTilePress).toBeCalled();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
