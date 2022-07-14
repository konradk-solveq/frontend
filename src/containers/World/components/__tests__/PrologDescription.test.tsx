import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import appConfig from '@api/mocks/configData';
import mapData from '@api/mocks/mapData';
import {mapToClass} from '@utils/transformData';

import PrologDescription from '@containers/World/components/PrologDescription';

const routeData = mapToClass(mapData.elements[0], appConfig);
const pickedDifficulties = routeData.pickedDifficulties || [];

const PROLOG_DESCRIPTION_TEST_ID = 'prolog-description-test-id';
const PROLOG_DESCRIPTION_HEADER2_TEST_ID = 'header2-test-id';
const PROLOG_DESCRIPTION_DIFFICULITES_TEST_ID = `${PROLOG_DESCRIPTION_TEST_ID}-row2`;
const PROLOG_DESCRIPTION_LIKES_TEST_ID = `${PROLOG_DESCRIPTION_TEST_ID}-row3`;
const PROLOG_DESCRIPTION_DIFFICULTY_SURFACE_TEST_ID = `${PROLOG_DESCRIPTION_TEST_ID}-difficulty-surface-info`;

describe('<PrologDescription /> - containers/World/components/PrologDescription', () => {
    it('Should render route name, distance and time', () => {
        const {getAllByTestId} = render(
            <PrologDescription
                name={routeData.name}
                distance={routeData.distanceInKilometers}
                time={routeData.timeFormatedToString}
            />,
        );

        const headersFromFirstRow = getAllByTestId(
            PROLOG_DESCRIPTION_HEADER2_TEST_ID,
        );
        /* Check if route name is rendered */
        expect(headersFromFirstRow[0].props.children).toContain(routeData.name);
        /* Check if route distance is rendered */
        expect(headersFromFirstRow[1].props.children).toContain(
            routeData.distanceInKilometers,
        );
        /* Check if time distance is rendered */
        expect(headersFromFirstRow[1].props.children).toContain(
            routeData.timeFormatedToString,
        );
    });

    it.each([
        [pickedDifficulties],
        [
            [
                appConfig.difficulties[0].enumValue,
                appConfig.difficulties[1].enumValue,
            ],
        ],
    ])(
        'Should render distance to route and difficulty level - %s',
        (difficulty?: string[]) => {
            /* In jest it is not transformed from json key */
            const suffix = 'RoutesDetails.details.multiDifficulties';
            const {getByTestId} = render(
                <PrologDescription
                    distanceToRoute={routeData.distanceToRouteInKilometers}
                    difficultiesLevels={difficulty}
                />,
            );

            const difficultiesFromSecondRow = getByTestId(
                PROLOG_DESCRIPTION_DIFFICULITES_TEST_ID,
            );
            /* Check if renders distance to route */
            expect(
                difficultiesFromSecondRow.props.children[0].props.children,
            ).toContain(routeData.distanceToRouteInKilometers);
            /* CHeck if renders suffix for multi difficulties */
            if (difficulty && difficulty?.length > 1) {
                expect(
                    difficultiesFromSecondRow.props.children[1].props
                        .children[0],
                ).toContain(suffix);
            } else {
                expect(
                    difficultiesFromSecondRow.props.children[1].props
                        .children[0],
                ).not.toContain(suffix);
            }
        },
    );

    it('Should render likes number', () => {
        const {getByTestId} = render(
            <PrologDescription reactions={routeData.reactions} />,
        );

        const headersFromThirdRow = getByTestId(
            `${PROLOG_DESCRIPTION_LIKES_TEST_ID}-likes`,
        );
        /* Check likes number*/
        expect(headersFromThirdRow.props.children).toEqual(
            routeData.reactions?.like,
        );
    });

    it("Should render surface string if there's surface string passed", () => {
        const {getByTestId} = render(
            <PrologDescription
                reactions={routeData.reactions}
                surfaceString={'test'}
            />,
        );

        const difficultySurfaceInfo = getByTestId(
            PROLOG_DESCRIPTION_DIFFICULTY_SURFACE_TEST_ID,
        );
        expect(difficultySurfaceInfo.props.children[2]).toContain('test');
    });

    it("Shouldn't render anything after the difficulty if there's no surface string passed", () => {
        const {getByTestId} = render(
            <PrologDescription reactions={routeData.reactions} />,
        );

        const difficultySurfaceInfo = getByTestId(
            PROLOG_DESCRIPTION_DIFFICULTY_SURFACE_TEST_ID,
        );
        expect(difficultySurfaceInfo.props.children[1]).toBeFalsy();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
