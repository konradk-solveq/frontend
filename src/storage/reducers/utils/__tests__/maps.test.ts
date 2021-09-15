import {FeaturedMapType} from '@models/map.model';
import deepCopy from '@src/helpers/deepCopy';
import {NestedPaginationType} from '@src/interfaces/api';
import {NestedTotalMapsType} from '@src/type/maps';
import {MergedFeaturedMapsI, mergeFeaturedMapsListData} from '../maps';
import mockedDataInit from './mocks/featuredRoutesDataInit';
import mockedDataNext from './mocks/featuredRoutesDataNext';
import mockedTransformedData from './mocks/transformedFeaturedRouteData';
import mockedTransformedDataNext from './mocks/transformedFeaturedRouteDataNext';
// import mockedTransformedDataNextAsNew from './mocks/transformedFeaturedRouteDataNextAsNew';

/* TODO: fix mock */
const mData: FeaturedMapType[] = deepCopy(mockedDataInit);
const mDataNext: FeaturedMapType[] = deepCopy(mockedDataNext);
const mTransformedData: MergedFeaturedMapsI = deepCopy(mockedTransformedData)

describe('Return merged state of map reducer -- utils', () => {
    it('[getFeaturedMapsListPaginations] - create new state - success', () => {
        const updatedState = mergeFeaturedMapsListData(
            {refresh: true, featuredMaps: mData},
            {
                oldFeaturedMaps: [],
                oldPaginationCoursorFeatured: [],
                oldTotalFeaturedMaps: [],
            },
        );

        expect(updatedState).toEqual(mockedTransformedData);

        expect(updatedState).toMatchSnapshot();
    });

    it('[getFeaturedMapsListPaginations] - merge new data with old state - success', () => {
        const oldStateFM: FeaturedMapType[] = mTransformedData.newFeaturedMaps;
        const oldStatePCF: NestedPaginationType[] = 
        mTransformedData.paginationCoursorFeatured
        ;
        const oldStateTFM: NestedTotalMapsType[] = 
        mTransformedData.totalFeaturedMaps
        ;

        const updatedState = mergeFeaturedMapsListData(
            {refresh: false, featuredMaps: mDataNext},
            {
                oldFeaturedMaps: oldStateFM,
                oldPaginationCoursorFeatured: oldStatePCF,
                oldTotalFeaturedMaps: oldStateTFM,
            },
        );

        expect(updatedState).toEqual(mockedTransformedDataNext);

        expect(updatedState).toMatchSnapshot();
    });

    it('[getFeaturedMapsListPaginations] - merge new data with old state - fail when refreshing', () => {
        const oldStateFM: FeaturedMapType[] = mTransformedData.newFeaturedMaps;
        const oldStatePCF: NestedPaginationType[] = mTransformedData.paginationCoursorFeatured;
        const oldStateTFM: NestedTotalMapsType[] = mTransformedData.totalFeaturedMaps;

        const updatedState = mergeFeaturedMapsListData(
            {refresh: true, featuredMaps: mData},
            {
                oldFeaturedMaps: oldStateFM,
                oldPaginationCoursorFeatured: oldStatePCF,
                oldTotalFeaturedMaps: oldStateTFM,
            },
        );

        expect(updatedState).not.toEqual(mockedTransformedDataNext);

        expect(updatedState).toMatchSnapshot();
    });

    it('[getFeaturedMapsListPaginations] - merge new data with old state - success when refreshing', () => {
        const oldStateFM: FeaturedMapType[] = mTransformedData.newFeaturedMaps;
        const oldStatePCF: NestedPaginationType[] = mTransformedData.paginationCoursorFeatured;
        const oldStateTFM: NestedTotalMapsType[] = mTransformedData.totalFeaturedMaps;

        const updatedState = mergeFeaturedMapsListData(
            {refresh: true, featuredMaps: mData},
            {
                oldFeaturedMaps: oldStateFM,
                oldPaginationCoursorFeatured: oldStatePCF,
                oldTotalFeaturedMaps: oldStateTFM,
            },
        );

        expect(updatedState).toEqual(mockedTransformedData);

        expect(updatedState).toMatchSnapshot();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
