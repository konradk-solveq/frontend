import {getCenterLeftPxResult, getCenterTopPxResult} from './mocks/layoutFoo';
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

const layoutObj = {
    small: {
        w: 30,
        h: 30,
    },
    medium: {
        w: 120,
        h: 150,
    },
    big: {
        w: 330,
        h: 400,
    },
};

describe('Calculates layout positions -- helpers', () => {
    describe('[centerLeftPx] - counts layout center element left position', () => {
        beforeAll(() => {
            initAppSize();
        });

        it.each([
            [layoutObj.small.w, layoutObj.small.h, getCenterLeftPxResult[0]],
            [layoutObj.medium.w, layoutObj.medium.h, getCenterLeftPxResult[1]],
            [layoutObj.big.w, layoutObj.big.h, getCenterLeftPxResult[2]],
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
        beforeAll(() => {
            initAppSize();
        });

        it.each([
            [layoutObj.small.w, layoutObj.small.h, getCenterTopPxResult[0]],
            [layoutObj.medium.w, layoutObj.medium.h, getCenterTopPxResult[1]],
            [layoutObj.big.w, layoutObj.big.h, getCenterTopPxResult[2]],
        ])(
            'Should calculate positions (w: %s, h: %s) and result should be equal to: %s',
            (w: number, h: number, result: number) => {
                setObjSize(w, h);
                const centerTopPx = getCenterTopPx();

                expect(centerTopPx).toEqual(result);
            },
        );
    });
});
