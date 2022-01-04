import {centerLeftPxResult, centerTopPxResult} from './mocks/layoutFoo';
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

describe('Calculates layout positions -- helpers', () => {
    describe('[centerLeftPx] - counts layout center element left position', () => {
        beforeAll(() => {
            initAppSize();
        });

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
        beforeAll(() => {
            initAppSize();
        });

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
});
