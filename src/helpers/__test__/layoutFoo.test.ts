import {
    centerLeftPxResult,
    centerTopPxResult,
    horizontalResult,
    horizontalPxResult,
    verticalResult,
    verticalPxResult,
    stackHeaderHeightResult,
    widthResult,
    widthOfResult,
    widthPxResult,
    widthPxOfResult,
    heightResult,
    heightPxResult,
    heightOfPxResult,
    relativeWidthResult,
    relativeHeightResult,
    standardResult,
    standardPxResult,
    perfectPxResult,
    posStaticHeightResult,
} from './mocks/layoutFoo';
import {
    initAppSize,
    setObjSize,
    getCenterLeftPx,
    getCenterTopPx,
    getHorizontal,
    getHorizontalPx,
    getVertical,
    getVerticalPx,
    getWidth,
    getWidthOf,
    getWidthPx,
    getWidthPxOf,
    getHeight,
    getHeightPx,
    getHeightOfPx,
    getRelativeWidth,
    getRelativeHeight,
    getStandard,
    getStandardPx,
    getPerfectPx,
    getPosStaticHeight,
    getOnlyPos,
    getPosAndWid,
    getPosWithMinHeight,
    getStackHeaderHeight,
    getFontSize,
    mainButtonsHeight,
} from '@helpers/layoutFoo';

const obj = {
    small: [
        {w: 3, h: 2, l: 216, t: 680},
        {w: 12, h: 8, l: 198, t: 540},
        {w: 30, h: 16, l: 174, t: 430},
    ],
    medium: [
        {w: 90, h: 110, l: 56, t: 98},
        {w: 120, h: 150, l: 62, t: 126},
        {w: 160, h: 190, l: 70, t: 170},
    ],
    big: [
        {w: 280, h: 420, l: 16, t: 26},
        {w: 330, h: 660, l: 12, t: 12},
        {w: 400, h: 800, l: 6, t: 5},
    ],
};

describe('Calculates layout positions -- helpers', () => {
    beforeAll(() => {
        initAppSize();
        jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
            get: jest.fn().mockReturnValue({width: 750, height: 1334}),
        }));
    });

    afterAll(() => {
        jest.resetModules();
    });

    describe('[centerLeftPx] - counts layout center element left position', () => {
        it.each([
            [obj.small[0].w, obj.small[0].h, centerLeftPxResult.small[0]],
            [obj.small[1].w, obj.small[1].h, centerLeftPxResult.small[1]],
            [obj.small[2].w, obj.small[2].h, centerLeftPxResult.small[2]],
            [obj.medium[0].w, obj.medium[0].h, centerLeftPxResult.medium[0]],
            [obj.medium[1].w, obj.medium[1].h, centerLeftPxResult.medium[1]],
            [obj.medium[2].w, obj.medium[2].h, centerLeftPxResult.medium[2]],
            [obj.big[0].w, obj.big[0].h, centerLeftPxResult.big[0]],
            [obj.big[1].w, obj.big[1].h, centerLeftPxResult.big[1]],
            [obj.big[2].w, obj.big[2].h, centerLeftPxResult.big[2]],
        ])(
            'Should calculate positions (w: %s, h: %s) and result should be equal to: %s',
            (w: number, h: number, result: number) => {
                setObjSize(w, h);
                const centerLeftPx = getCenterLeftPx();

                expect(centerLeftPx).toEqual(result);
            },
        );
    });

    describe('[centerTopPx] - counts layout center element top position', () => {
        it.each([
            [obj.small[0].w, obj.small[0].h, centerTopPxResult.small[0]],
            [obj.small[1].w, obj.small[1].h, centerTopPxResult.small[1]],
            [obj.small[2].w, obj.small[2].h, centerTopPxResult.small[2]],
            [obj.medium[0].w, obj.medium[0].h, centerTopPxResult.medium[0]],
            [obj.medium[1].w, obj.medium[1].h, centerTopPxResult.medium[1]],
            [obj.medium[2].w, obj.medium[2].h, centerTopPxResult.medium[2]],
            [obj.big[0].w, obj.big[0].h, centerTopPxResult.big[0]],
            [obj.big[1].w, obj.big[1].h, centerTopPxResult.big[1]],
            [obj.big[2].w, obj.big[2].h, centerTopPxResult.big[2]],
        ])(
            'Should calculate positions (w: %s, h: %s) and result should be equal to: %s',
            (w: number, h: number, result: number) => {
                setObjSize(w, h);
                const centerTopPx = getCenterTopPx();

                expect(centerTopPx).toEqual(result);
            },
        );
    });

    describe('[getHorizontal] - counts layout horizontal element size in %', () => {
        it.each([
            [obj.small[0].w, horizontalResult.small[0]],
            [obj.small[1].w, horizontalResult.small[1]],
            [obj.small[2].w, horizontalResult.small[2]],
            [obj.medium[0].w, horizontalResult.medium[0]],
            [obj.medium[1].w, horizontalResult.medium[1]],
            [obj.medium[2].w, horizontalResult.medium[2]],
            [obj.big[0].w, horizontalResult.big[0]],
            [obj.big[1].w, horizontalResult.big[1]],
            [obj.big[2].w, horizontalResult.big[2]],
        ])(
            'Should calculate width: %s, and result should be equal to: %s',
            (w: number, result: string) => {
                const horizontal = getHorizontal(w);

                expect(horizontal).toEqual(result);
            },
        );
    });

    describe('[getHorizontalPx] - counts layout horizontal element size in px', () => {
        it.each([
            [obj.small[0].w, horizontalPxResult.small[0]],
            [obj.small[1].w, horizontalPxResult.small[1]],
            [obj.small[2].w, horizontalPxResult.small[2]],
            [obj.medium[0].w, horizontalPxResult.medium[0]],
            [obj.medium[1].w, horizontalPxResult.medium[1]],
            [obj.medium[2].w, horizontalPxResult.medium[2]],
            [obj.big[0].w, horizontalPxResult.big[0]],
            [obj.big[1].w, horizontalPxResult.big[1]],
            [obj.big[2].w, horizontalPxResult.big[2]],
        ])(
            'Should calculate width: %s, and result should be equal to: %s',
            (w: number, result: number) => {
                const horizontalPx = getHorizontalPx(w);

                expect(horizontalPx).toEqual(result);
            },
        );
    });

    describe('[getVertical] - counts layout vertical element size in %', () => {
        it.each([
            [obj.small[0].h, verticalResult.small[0]],
            [obj.small[1].h, verticalResult.small[1]],
            [obj.small[2].h, verticalResult.small[2]],
            [obj.medium[0].h, verticalResult.medium[0]],
            [obj.medium[1].h, verticalResult.medium[1]],
            [obj.medium[2].h, verticalResult.medium[2]],
            [obj.big[0].h, verticalResult.big[0]],
            [obj.big[1].h, verticalResult.big[1]],
            [obj.big[2].h, verticalResult.big[2]],
        ])(
            'Should calculate height: %s, and result should be equal to: %s',
            (h: number, result: string) => {
                const vertical = getVertical(h);

                expect(vertical).toEqual(result);
            },
        );
    });

    describe('[getVerticalPx] - counts layout vertical element size in px', () => {
        it.each([
            [obj.small[0].h, verticalPxResult.small[0]],
            [obj.small[1].h, verticalPxResult.small[1]],
            [obj.small[2].h, verticalPxResult.small[2]],
            [obj.medium[0].h, verticalPxResult.medium[0]],
            [obj.medium[1].h, verticalPxResult.medium[1]],
            [obj.medium[2].h, verticalPxResult.medium[2]],
            [obj.big[0].h, verticalPxResult.big[0]],
            [obj.big[1].h, verticalPxResult.big[1]],
            [obj.big[2].h, verticalPxResult.big[2]],
        ])(
            'Should calculate height: %s, and result should be equal to: %s',
            (h: number, result: number) => {
                const verticalPx = getVerticalPx(h);

                expect(verticalPx).toEqual(result);
            },
        );
    });

    describe('[getStackHeaderHeight] - counts stack header height in px', () => {
        it('Should calculate height: %s, and result should be equal to: %s', () => {
            const stackHeaderHeight = getStackHeaderHeight();
            expect(stackHeaderHeight).toEqual(stackHeaderHeightResult);
        });
    });

    //---------------------------------------------

    describe('[getWidth] - counts layout width of seated element size in %', () => {
        it.each([
            [obj.small[0].w, obj.small[0].h, widthResult.small[0]],
            [obj.small[1].w, obj.small[1].h, widthResult.small[1]],
            [obj.small[2].w, obj.small[2].h, widthResult.small[2]],
            [obj.medium[0].w, obj.medium[0].h, widthResult.medium[0]],
            [obj.medium[1].w, obj.medium[1].h, widthResult.medium[1]],
            [obj.medium[2].w, obj.medium[2].h, widthResult.medium[2]],
            [obj.big[0].w, obj.big[0].h, widthResult.big[0]],
            [obj.big[1].w, obj.big[1].h, widthResult.big[1]],
            [obj.big[2].w, obj.big[2].h, widthResult.big[2]],
        ])(
            'Should calculate width from object (w: %s, h: %s), and result should be equal to: %s',
            (w: number, h: number, result: string) => {
                setObjSize(w, h);
                const width = getWidth();

                expect(width).toEqual(result);
            },
        );
    });

    describe('[getWidthOf] - counts layout width element in %', () => {
        it.each([
            [obj.small[0].w, widthOfResult.small[0]],
            [obj.small[1].w, widthOfResult.small[1]],
            [obj.small[2].w, widthOfResult.small[2]],
            [obj.medium[0].w, widthOfResult.medium[0]],
            [obj.medium[1].w, widthOfResult.medium[1]],
            [obj.medium[2].w, widthOfResult.medium[2]],
            [obj.big[0].w, widthOfResult.big[0]],
            [obj.big[1].w, widthOfResult.big[1]],
            [obj.big[2].w, widthOfResult.big[2]],
        ])(
            'Should calculate width: %s, and result should be equal to: %s',
            (w: number, result: string) => {
                const widthOf = getWidthOf(w);

                expect(widthOf).toEqual(result);
            },
        );
    });

    describe('[getWidthPx] - counts layout width of seated element size in px', () => {
        it.each([
            [obj.small[0].w, obj.small[0].h, widthPxResult.small[0]],
            [obj.small[1].w, obj.small[1].h, widthPxResult.small[1]],
            [obj.small[2].w, obj.small[2].h, widthPxResult.small[2]],
            [obj.medium[0].w, obj.medium[0].h, widthPxResult.medium[0]],
            [obj.medium[1].w, obj.medium[1].h, widthPxResult.medium[1]],
            [obj.medium[2].w, obj.medium[2].h, widthPxResult.medium[2]],
            [obj.big[0].w, obj.big[0].h, widthPxResult.big[0]],
            [obj.big[1].w, obj.big[1].h, widthPxResult.big[1]],
            [obj.big[2].w, obj.big[2].h, widthPxResult.big[2]],
        ])(
            'Should calculate width from object (w: %s, h: %s), and result should be equal to: %s',
            (w: number, h: number, result: number) => {
                setObjSize(w, h);
                const widthPx = getWidthPx();

                expect(widthPx).toEqual(result);
            },
        );
    });

    describe('[getWidthPxOf] - counts layout width element in px', () => {
        it.each([
            [obj.small[0].w, widthPxOfResult.small[0]],
            [obj.small[1].w, widthPxOfResult.small[1]],
            [obj.small[2].w, widthPxOfResult.small[2]],
            [obj.medium[0].w, widthPxOfResult.medium[0]],
            [obj.medium[1].w, widthPxOfResult.medium[1]],
            [obj.medium[2].w, widthPxOfResult.medium[2]],
            [obj.big[0].w, widthPxOfResult.big[0]],
            [obj.big[1].w, widthPxOfResult.big[1]],
            [obj.big[2].w, widthPxOfResult.big[2]],
        ])(
            'Should calculate width: %s, and result should be equal to: %s',
            (w: number, result: number) => {
                const widthPxOf = getWidthPxOf(w);

                expect(widthPxOf).toEqual(result);
            },
        );
    });

    describe('[getHeight] - counts layout height of seated element size in %', () => {
        it.each([
            [obj.small[0].w, obj.small[0].h, heightResult.small[0]],
            [obj.small[1].w, obj.small[1].h, heightResult.small[1]],
            [obj.small[2].w, obj.small[2].h, heightResult.small[2]],
            [obj.medium[0].w, obj.medium[0].h, heightResult.medium[0]],
            [obj.medium[1].w, obj.medium[1].h, heightResult.medium[1]],
            [obj.medium[2].w, obj.medium[2].h, heightResult.medium[2]],
            [obj.big[0].w, obj.big[0].h, heightResult.big[0]],
            [obj.big[1].w, obj.big[1].h, heightResult.big[1]],
            [obj.big[2].w, obj.big[2].h, heightResult.big[2]],
        ])(
            'Should calculate height from object (w: %s, h: %s), and result should be equal to: %s',
            (w: number, h: number, result: string) => {
                setObjSize(w, h);
                const height = getHeight();

                expect(height).toEqual(result);
            },
        );
    });

    describe('[getHeightPx] - counts layout height of seated element size in px', () => {
        it.each([
            [obj.small[0].w, obj.small[0].h, heightPxResult.small[0]],
            [obj.small[1].w, obj.small[1].h, heightPxResult.small[1]],
            [obj.small[2].w, obj.small[2].h, heightPxResult.small[2]],
            [obj.medium[0].w, obj.medium[0].h, heightPxResult.medium[0]],
            [obj.medium[1].w, obj.medium[1].h, heightPxResult.medium[1]],
            [obj.medium[2].w, obj.medium[2].h, heightPxResult.medium[2]],
            [obj.big[0].w, obj.big[0].h, heightPxResult.big[0]],
            [obj.big[1].w, obj.big[1].h, heightPxResult.big[1]],
            [obj.big[2].w, obj.big[2].h, heightPxResult.big[2]],
        ])(
            'Should calculate height from object (w: %s, h: %s), and result should be equal to: %s',
            (w: number, h: number, result: number) => {
                setObjSize(w, h);
                const heightPx = getHeightPx();

                expect(heightPx).toEqual(result);
            },
        );
    });

    describe('[getHeightOfPx] - counts layout height element in px', () => {
        it.each([
            [obj.small[0].h, heightOfPxResult.small[0]],
            [obj.small[1].h, heightOfPxResult.small[1]],
            [obj.small[2].h, heightOfPxResult.small[2]],
            [obj.medium[0].h, heightOfPxResult.medium[0]],
            [obj.medium[1].h, heightOfPxResult.medium[1]],
            [obj.medium[2].h, heightOfPxResult.medium[2]],
            [obj.big[0].h, heightOfPxResult.big[0]],
            [obj.big[1].h, heightOfPxResult.big[1]],
            [obj.big[2].h, heightOfPxResult.big[2]],
        ])(
            'Should calculate height: %s, and result should be equal to: %s',
            (w: number, result: number) => {
                const heightOfPx = getHeightOfPx(w);

                expect(heightOfPx).toEqual(result);
            },
        );
    });

    describe('[getRelativeWidth] - counts layout relative width of seated element size in %', () => {
        it.each([
            [obj.small[0].w, obj.small[0].h, relativeWidthResult.small[0]],
            [obj.small[1].w, obj.small[1].h, relativeWidthResult.small[1]],
            [obj.small[2].w, obj.small[2].h, relativeWidthResult.small[2]],
            [obj.medium[0].w, obj.medium[0].h, relativeWidthResult.medium[0]],
            [obj.medium[1].w, obj.medium[1].h, relativeWidthResult.medium[1]],
            [obj.medium[2].w, obj.medium[2].h, relativeWidthResult.medium[2]],
            [obj.big[0].w, obj.big[0].h, relativeWidthResult.big[0]],
            [obj.big[1].w, obj.big[1].h, relativeWidthResult.big[1]],
            [obj.big[2].w, obj.big[2].h, relativeWidthResult.big[2]],
        ])(
            'Should calculate relative width from object (w: %s, h: %s), and result should be equal to: %s',
            (w: number, h: number, result: string) => {
                setObjSize(w, h);
                const relativeWidth = getRelativeWidth();

                expect(relativeWidth).toEqual(result);
            },
        );
    });

    describe('[getRelativeHeight] - counts layout relative height of seated element size in %', () => {
        it.each([
            [obj.small[0].w, obj.small[0].h, relativeHeightResult.small[0]],
            [obj.small[1].w, obj.small[1].h, relativeHeightResult.small[1]],
            [obj.small[2].w, obj.small[2].h, relativeHeightResult.small[2]],
            [obj.medium[0].w, obj.medium[0].h, relativeHeightResult.medium[0]],
            [obj.medium[1].w, obj.medium[1].h, relativeHeightResult.medium[1]],
            [obj.medium[2].w, obj.medium[2].h, relativeHeightResult.medium[2]],
            [obj.big[0].w, obj.big[0].h, relativeHeightResult.big[0]],
            [obj.big[1].w, obj.big[1].h, relativeHeightResult.big[1]],
            [obj.big[2].w, obj.big[2].h, relativeHeightResult.big[2]],
        ])(
            'Should calculate relative height from object (w: %s, h: %s), and result should be equal to: %s',
            (w: number, h: number, result: string) => {
                setObjSize(w, h);
                const relativeHeight = getRelativeHeight();

                expect(relativeHeight).toEqual(result);
            },
        );
    });

    //---------------------------------------------

    type standardT = {
        height: string;
        left: number;
        position: 'relative' | 'absolute' | undefined;
        top: number;
        width: string;
    };

    describe('[getStandard] - counts layout object of seated element size in %', () => {
        it.each([
            [
                obj.small[0].w,
                obj.small[0].h,
                obj.small[0].t,
                standardResult.small[0],
            ],
            [
                obj.small[1].w,
                obj.small[1].h,
                obj.small[1].t,
                standardResult.small[1],
            ],
            [
                obj.small[2].w,
                obj.small[2].h,
                obj.small[2].t,
                standardResult.small[2],
            ],
            [
                obj.medium[0].w,
                obj.medium[0].h,
                obj.medium[0].t,
                standardResult.medium[0],
            ],
            [
                obj.medium[1].w,
                obj.medium[1].h,
                obj.medium[1].t,
                standardResult.medium[1],
            ],
            [
                obj.medium[2].w,
                obj.medium[2].h,
                obj.medium[2].t,
                standardResult.medium[2],
            ],
            [obj.big[0].w, obj.big[0].h, obj.big[0].t, standardResult.big[0]],
            [obj.big[1].w, obj.big[1].h, obj.big[1].t, standardResult.big[1]],
            [obj.big[2].w, obj.big[2].h, obj.big[2].t, standardResult.big[2]],
        ])(
            'Should calculate object (w: %s, h: %s, t: %s), and result should be equal to: %s',
            (w: number, h: number, t: number, result: standardT) => {
                const standard = getStandard(w, h, t);

                expect(standard).toEqual(result);
            },
        );
    });

    type standardPxT = {
        height: number;
        left: number;
        position: 'relative' | 'absolute' | undefined;
        top: number;
        width: number;
    };

    describe('[getStandardPx] - counts layout object of seated element size in px', () => {
        it.each([
            [
                obj.small[0].w,
                obj.small[0].h,
                obj.small[0].t,
                standardPxResult.small[0],
            ],
            [
                obj.small[1].w,
                obj.small[1].h,
                obj.small[1].t,
                standardPxResult.small[1],
            ],
            [
                obj.small[2].w,
                obj.small[2].h,
                obj.small[2].t,
                standardPxResult.small[2],
            ],
            [
                obj.medium[0].w,
                obj.medium[0].h,
                obj.medium[0].t,
                standardPxResult.medium[0],
            ],
            [
                obj.medium[1].w,
                obj.medium[1].h,
                obj.medium[1].t,
                standardPxResult.medium[1],
            ],
            [
                obj.medium[2].w,
                obj.medium[2].h,
                obj.medium[2].t,
                standardPxResult.medium[2],
            ],
            [obj.big[0].w, obj.big[0].h, obj.big[0].t, standardPxResult.big[0]],
            [obj.big[1].w, obj.big[1].h, obj.big[1].t, standardPxResult.big[1]],
            [obj.big[2].w, obj.big[2].h, obj.big[2].t, standardPxResult.big[2]],
        ])(
            'Should calculate object (w: %s, h: %s, t: %s), and result should be equal to: %s',
            (w: number, h: number, t: number, result: standardPxT) => {
                const standardPx = getStandardPx(w, h, t);

                expect(standardPx).toEqual(result);
            },
        );
    });

    type perfectPxT = {
        position: 'relative' | 'absolute' | undefined;
        width: number;
        height: number;
        left: number;
        top: number;
    };

    describe('[getPerfectPx] - counts layout object of seated element size in px', () => {
        it.each([
            [
                obj.small[0].w,
                obj.small[0].h,
                obj.small[0].l,
                obj.small[0].t,
                perfectPxResult.small[0],
            ],
            [
                obj.small[1].w,
                obj.small[1].h,
                obj.small[1].l,
                obj.small[1].t,
                perfectPxResult.small[1],
            ],
            [
                obj.small[2].w,
                obj.small[2].h,
                obj.small[2].l,
                obj.small[2].t,
                perfectPxResult.small[2],
            ],
            [
                obj.medium[0].w,
                obj.medium[0].h,
                obj.medium[0].l,
                obj.medium[0].t,
                perfectPxResult.medium[0],
            ],
            [
                obj.medium[1].w,
                obj.medium[1].h,
                obj.medium[1].l,
                obj.medium[1].t,
                perfectPxResult.medium[1],
            ],
            [
                obj.medium[2].w,
                obj.medium[2].h,
                obj.medium[2].l,
                obj.medium[2].t,
                perfectPxResult.medium[2],
            ],
            [
                obj.big[0].w,
                obj.big[0].h,
                obj.big[0].l,
                obj.big[0].t,
                perfectPxResult.big[0],
            ],
            [
                obj.big[1].w,
                obj.big[1].h,
                obj.big[0].l,
                obj.big[1].t,
                perfectPxResult.big[1],
            ],
            [
                obj.big[2].w,
                obj.big[2].h,
                obj.big[0].l,
                obj.big[2].t,
                perfectPxResult.big[2],
            ],
        ])(
            'Should calculate object (w: %s, h: %s, t: %s), and result should be equal to: %s',
            (
                w: number,
                h: number,
                l: number,
                t: number,
                result: perfectPxT,
            ) => {
                const perfectPx = getPerfectPx(w, h, l, t);

                expect(perfectPx).toEqual(result);
            },
        );
    });

    type posStaticHeightT = {
        position: 'relative' | 'absolute' | undefined;
        width: number;
        height: number;
        left: number;
        top: string;
    };

    describe('[getPosStaticHeight] - counts layout object of seated element size', () => {
        it.each([
            [
                obj.small[0].w,
                obj.small[0].h,
                obj.small[0].t,
                posStaticHeightResult.small[0],
            ],
            [
                obj.small[1].w,
                obj.small[1].h,
                obj.small[1].t,
                posStaticHeightResult.small[1],
            ],
            [
                obj.small[2].w,
                obj.small[2].h,
                obj.small[2].t,
                posStaticHeightResult.small[2],
            ],
            [
                obj.medium[0].w,
                obj.medium[0].h,
                obj.medium[0].t,
                posStaticHeightResult.medium[0],
            ],
            [
                obj.medium[1].w,
                obj.medium[1].h,
                obj.medium[1].t,
                posStaticHeightResult.medium[1],
            ],
            [
                obj.medium[2].w,
                obj.medium[2].h,
                obj.medium[2].t,
                posStaticHeightResult.medium[2],
            ],
            [
                obj.big[0].w,
                obj.big[0].h,
                obj.big[0].t,
                posStaticHeightResult.big[0],
            ],
            [
                obj.big[1].w,
                obj.big[1].h,
                obj.big[1].t,
                posStaticHeightResult.big[1],
            ],
            [
                obj.big[2].w,
                obj.big[2].h,
                obj.big[2].t,
                posStaticHeightResult.big[2],
            ],
        ])(
            'Should calculate object (w: %s, h: %s, t: %s), and result should be equal to: %s',
            (w: number, h: number, t: number, result: posStaticHeightT) => {
                const posStaticHeight = getPosStaticHeight(w, h, t);

                expect(posStaticHeight).toEqual(result);
            },
        );
    });
});
