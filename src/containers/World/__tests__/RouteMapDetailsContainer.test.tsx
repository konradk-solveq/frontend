import 'react-native';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import appConfig from '@api/mocks/configData';
import mapData from '@api/mocks/mapData';
import {getImagesThumbs, mapToClass} from '@utils/transformData';

import RouteMapDetailsContainer from '@containers/World/RouteMapDetailsContainer';

const routeData = mapToClass(mapData.elements[0], appConfig);
const images = getImagesThumbs({
    images: routeData?.images || [],
    thumbnails: [],
});

const ROUTE_MAP_CONTAINER_TEST_ID = 'route-map-details-container';
const COMMON_ACTION_BUTTONS_TEST_ID = `${ROUTE_MAP_CONTAINER_TEST_ID}-common-action-buttons`;
const COMMON_ACTION_BUTTONS_PRIMARY_BUTTON_TEST_ID = `${COMMON_ACTION_BUTTONS_TEST_ID}-primary-button`;
const COMMON_ACTION_BUTTONS_SECONDARY_BUTTON_TEST_ID = `${COMMON_ACTION_BUTTONS_TEST_ID}-secondary-button`;
const COMMON_ACTION_BUTTONS_ICON_BUTTON_TEST_ID = `${COMMON_ACTION_BUTTONS_TEST_ID}-icon-button`;

const PRIVATE_ACTION_BUTTONS_TEST_ID = `${ROUTE_MAP_CONTAINER_TEST_ID}-private-action-buttons`;
const PRIVATE_ACTION_BUTTONS_PRIMARY_BUTTON_TEST_ID = `${PRIVATE_ACTION_BUTTONS_TEST_ID}-primary-button`;
const PRIVATE_ACTION_BUTTONS_SECONDARY_BUTTON_TEST_ID = `${PRIVATE_ACTION_BUTTONS_TEST_ID}-secondary-button`;
const PRIVATE_ACTION_BUTTONS_ICON_BUTTON_TEST_ID = `${PRIVATE_ACTION_BUTTONS_TEST_ID}-icon-button`;
const ALTERNATIVE_ACTION_BUTTONS_PRIMARY_BUTTON_TEST_ID = `${PRIVATE_ACTION_BUTTONS_TEST_ID}-alternative-primary-button`;

describe('<RouteMapDetailsContainer /> - containers/World/containers/RouteMapDetailsContainer', () => {
    const onPresFn = jest.fn();

    it('Should render prolog description with [CommonActionButtons]', () => {
        const {getByTestId} = render(
            <RouteMapDetailsContainer
                onPressAction={onPresFn}
                mapData={routeData}
                mapImages={images}
                testID={ROUTE_MAP_CONTAINER_TEST_ID}
            />,
        );

        const routeMapDetailsContainer = getByTestId(
            COMMON_ACTION_BUTTONS_TEST_ID,
        );
        expect(routeMapDetailsContainer).not.toBeNull();
    });

    it('Should render prolog description with [PrivateActionButtons]', () => {
        const {getByTestId} = render(
            <RouteMapDetailsContainer
                onPressAction={onPresFn}
                mapData={routeData}
                mapImages={images}
                testID={ROUTE_MAP_CONTAINER_TEST_ID}
                isPrivate
            />,
        );

        const routeMapDetailsContainer = getByTestId(
            PRIVATE_ACTION_BUTTONS_TEST_ID,
        );
        expect(routeMapDetailsContainer).not.toBeNull();
    });

    describe('[Common Action Buttons]', () => {
        it('Should access primary button', () => {
            const {getByTestId} = render(
                <RouteMapDetailsContainer
                    onPressAction={onPresFn}
                    mapData={routeData}
                    mapImages={images}
                    testID={ROUTE_MAP_CONTAINER_TEST_ID}
                />,
            );

            const primaryButton = getByTestId(
                COMMON_ACTION_BUTTONS_PRIMARY_BUTTON_TEST_ID,
            );
            fireEvent.press(primaryButton);
        });

        it('Should access secondary button', () => {
            const {getByTestId} = render(
                <RouteMapDetailsContainer
                    onPressAction={onPresFn}
                    mapData={routeData}
                    mapImages={images}
                    testID={ROUTE_MAP_CONTAINER_TEST_ID}
                />,
            );

            const secondaryButton = getByTestId(
                COMMON_ACTION_BUTTONS_SECONDARY_BUTTON_TEST_ID,
            );
            fireEvent.press(secondaryButton);
        });

        it('Should access icon button', () => {
            const {getByTestId} = render(
                <RouteMapDetailsContainer
                    onPressAction={onPresFn}
                    mapData={routeData}
                    mapImages={images}
                    testID={ROUTE_MAP_CONTAINER_TEST_ID}
                />,
            );

            const secondaryButton = getByTestId(
                COMMON_ACTION_BUTTONS_ICON_BUTTON_TEST_ID,
            );
            fireEvent.press(secondaryButton);
        });
    });

    describe('[Private Action Buttons]', () => {
        describe('Route is published', () => {
            it('Should access primary button', () => {
                const {getByTestId} = render(
                    <RouteMapDetailsContainer
                        onPressAction={onPresFn}
                        mapData={routeData}
                        mapImages={images}
                        isPrivate
                        isPublished
                        testID={ROUTE_MAP_CONTAINER_TEST_ID}
                    />,
                );

                const primaryButton = getByTestId(
                    PRIVATE_ACTION_BUTTONS_PRIMARY_BUTTON_TEST_ID,
                );
                fireEvent.press(primaryButton);
            });

            it('Should access secondary button', () => {
                const {getByTestId} = render(
                    <RouteMapDetailsContainer
                        onPressAction={onPresFn}
                        mapData={routeData}
                        mapImages={images}
                        isPrivate
                        isPublished
                        testID={ROUTE_MAP_CONTAINER_TEST_ID}
                    />,
                );

                const secondaryButton = getByTestId(
                    PRIVATE_ACTION_BUTTONS_SECONDARY_BUTTON_TEST_ID,
                );
                fireEvent.press(secondaryButton);
            });

            it('Should access icon button', () => {
                const {getByTestId} = render(
                    <RouteMapDetailsContainer
                        onPressAction={onPresFn}
                        mapData={routeData}
                        mapImages={images}
                        isPrivate
                        isPublished
                        testID={ROUTE_MAP_CONTAINER_TEST_ID}
                    />,
                );

                const iconButton = getByTestId(
                    PRIVATE_ACTION_BUTTONS_ICON_BUTTON_TEST_ID,
                );
                fireEvent.press(iconButton);
            });

            it('Should not access alternative primary button', () => {
                const {queryByTestId} = render(
                    <RouteMapDetailsContainer
                        onPressAction={onPresFn}
                        mapData={routeData}
                        mapImages={images}
                        isPublished
                        isPrivate
                        testID={ROUTE_MAP_CONTAINER_TEST_ID}
                    />,
                );

                const alternativePrimaryButton = queryByTestId(
                    ALTERNATIVE_ACTION_BUTTONS_PRIMARY_BUTTON_TEST_ID,
                );
                expect(alternativePrimaryButton).toBeNull();
            });
        });

        describe('Route is not published', () => {
            it('Should not access primary button', () => {
                const {queryByTestId} = render(
                    <RouteMapDetailsContainer
                        onPressAction={onPresFn}
                        mapData={routeData}
                        mapImages={images}
                        isPrivate
                        testID={ROUTE_MAP_CONTAINER_TEST_ID}
                    />,
                );

                const primaryButton = queryByTestId(
                    PRIVATE_ACTION_BUTTONS_PRIMARY_BUTTON_TEST_ID,
                );
                expect(primaryButton).toBeNull();
            });

            it('Should access secondary button', () => {
                const {getByTestId} = render(
                    <RouteMapDetailsContainer
                        onPressAction={onPresFn}
                        mapData={routeData}
                        mapImages={images}
                        isPrivate
                        testID={ROUTE_MAP_CONTAINER_TEST_ID}
                    />,
                );

                const secondaryButton = getByTestId(
                    PRIVATE_ACTION_BUTTONS_SECONDARY_BUTTON_TEST_ID,
                );
                fireEvent.press(secondaryButton);
            });

            it('Should access icon button', () => {
                const {getByTestId} = render(
                    <RouteMapDetailsContainer
                        onPressAction={onPresFn}
                        mapData={routeData}
                        mapImages={images}
                        isPrivate
                        testID={ROUTE_MAP_CONTAINER_TEST_ID}
                    />,
                );

                const iconButton = getByTestId(
                    PRIVATE_ACTION_BUTTONS_ICON_BUTTON_TEST_ID,
                );
                fireEvent.press(iconButton);
            });

            it('Should access alternative secondary button', () => {
                const {getByTestId} = render(
                    <RouteMapDetailsContainer
                        onPressAction={onPresFn}
                        mapData={routeData}
                        mapImages={images}
                        isPrivate
                        testID={ROUTE_MAP_CONTAINER_TEST_ID}
                    />,
                );

                const alternativePrimaryButton = getByTestId(
                    ALTERNATIVE_ACTION_BUTTONS_PRIMARY_BUTTON_TEST_ID,
                );
                fireEvent.press(alternativePrimaryButton);
            });
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
