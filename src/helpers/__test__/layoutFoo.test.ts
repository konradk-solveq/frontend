import {
    centerLeftPxResult,
    centerTopPxResult,
    horizontalResult,
    horizontalPxResult,
    verticalResult,
    verticalPxResult,
    stackHeaderHeightResult,
    widthResult,
} from './mocks/layoutFoo';
import {
    setAppSize,
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
        {w: 3, h: 2},
        {w: 12, h: 8},
        {w: 30, h: 16},
    ],
    medium: [
        {w: 90, h: 110},
        {w: 120, h: 150},
        {w: 160, h: 190},
    ],
    big: [
        {w: 280, h: 420},
        {w: 330, h: 660},
        {w: 400, h: 800},
    ],
};

const mockDimensions = (width: number, height: number) => {
    jest.resetModules();
    jest.doMock('react-native/Libraries/Utilities/Dimensions', () => ({
        get: jest.fn().mockReturnValue({width, height}),
    }));
};
mockDimensions(414, 896);

describe('Calculates layout positions -- helpers', () => {
    beforeAll(() => {
        initAppSize();
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
            (w: string, result: string) => {
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
            (h: string, result: string) => {
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
});
