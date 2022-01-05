import counterPositionsResults from './mocks/counterPositions';
import {initAppSize} from '@helpers/layoutFoo';
import {counterPositions as cp} from '@helpers/counterPositions';

type positionBasedMapOnOffT = {
    mapOff: number;
    mapOn: number;
};
type positionBasedMapOnOffAplaShowT = {
    mapOff: number;
    mapOn: number;
    aplaShow: number;
};
type fontBasedOnSizeT = {
    big: number;
    small: number;
    label: number;
};

type positionBasedMapOnAplaShowT = {
    mapOn: number;
    aplaShow: number;
};

export interface counterPositionsResultI {
    constrainerHeight: positionBasedMapOnOffT;
    constrainerBottom: positionBasedMapOnOffAplaShowT;
    crossBtnBottom: positionBasedMapOnOffAplaShowT;
    wrapHeight: positionBasedMapOnOffT;
    wrapTop: positionBasedMapOnOffAplaShowT;
    cellRowHeight: positionBasedMapOnOffT;
    font: fontBasedOnSizeT;
    findMeBottom: positionBasedMapOnAplaShowT;
    cellWidth: positionBasedMapOnOffT;
    cellRowLeft: positionBasedMapOnOffT;
    cellRowTop: positionBasedMapOnOffT;
    plugBottom: positionBasedMapOnOffT;
}

describe('Calculates counter elements positions -- helpers', () => {
    describe('[counterPositions] - counts counter elements positions for animations', () => {
        beforeAll(() => {
            initAppSize();
            jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
                get: jest.fn().mockReturnValue({width: 750, height: 1334}),
            }));
        });

        afterAll(() => {
            jest.resetModules();
        });

        it('Should calculate positions and result should be equal to: %s', () => {
            const counterPosition: counterPositionsResultI = {
                constrainerHeight: {
                    mapOff: cp.constrainerHeight.getMapOff(),
                    mapOn: cp.constrainerHeight.getMapOn(),
                },
                constrainerBottom: {
                    mapOff: cp.constrainerBottom.getMapOff(),
                    mapOn: cp.constrainerBottom.getMapOn(),
                    aplaShow: cp.constrainerBottom.getAplaShow(),
                },
                crossBtnBottom: {
                    mapOff: cp.crossBtnBottom.getMapOff(),
                    mapOn: cp.crossBtnBottom.getMapOn(),
                    aplaShow: cp.crossBtnBottom.getAplaShow(),
                },
                wrapHeight: {
                    mapOff: cp.wrapHeight.getMapOff(),
                    mapOn: cp.wrapHeight.getMapOn(),
                },
                wrapTop: {
                    mapOff: cp.wrapTop.getMapOff(),
                    mapOn: cp.wrapTop.getMapOn(),
                    aplaShow: cp.wrapTop.getAplaShow(),
                },
                cellRowHeight: {
                    mapOff: cp.cellRowHeight.getMapOff(),
                    mapOn: cp.cellRowHeight.getMapOn(),
                },
                font: {
                    big: cp.font.getBig(),
                    small: cp.font.getSmall(),
                    label: cp.font.getLabel(),
                },
                findMeBottom: {
                    mapOn: cp.findMeBottom.getMapOn(),
                    aplaShow: cp.findMeBottom.getAplaShow(),
                },
                cellWidth: {
                    mapOff: cp.cellWidth.getMapOff(),
                    mapOn: cp.cellWidth.getMapOn(),
                },
                cellRowLeft: {
                    mapOff: cp.cellRowLeft.getMapOff(),
                    mapOn: cp.cellRowLeft.getMapOn(),
                },
                cellRowTop: {
                    mapOff: cp.cellRowTop.getMapOff(),
                    mapOn: cp.cellRowTop.getMapOn(),
                },
                plugBottom: {
                    mapOff: cp.plugBottom.getMapOff(),
                    mapOn: cp.plugBottom.getMapOn(),
                },
            };

            expect(counterPosition).toEqual(counterPositionsResults);
        });
    });
});
