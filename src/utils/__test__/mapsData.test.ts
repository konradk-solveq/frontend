import mapData from '@api/mocks/mapData';
import {updateIsUserFavouriteInMap} from '@utils/mapsData';
import deepCopy from '@helpers/deepCopy';

const mapDataMock = deepCopy(mapData).elements;
const mapIDToUpdate = mapDataMock[0].id;

describe('[mapsData] - @utils/mapsData', () => {
    describe('updateIsUserFavouriteInMap()', () => {
        it('Should update "isUserFavorite" to "true" in maps array', () => {
            const result = updateIsUserFavouriteInMap(
                mapDataMock,
                mapIDToUpdate,
                true,
            );
            const isFav = result.find(m => m.id === mapIDToUpdate)
                ?.isUserFavorite;

            expect(isFav).toBeTruthy();
        });

        it('Should update "isUserFavorite" to "false" in maps array', () => {
            const changed = [...mapDataMock];
            changed[0] = {...changed[0], isUserFavorite: true};
            const result = updateIsUserFavouriteInMap(
                changed,
                mapIDToUpdate,
                false,
            );
            const isFav = result.find(m => m.id === mapIDToUpdate)
                ?.isUserFavorite;

            expect(isFav).toBeFalsy();
        });

        it('Should return unmodified object when "mapID" not exists', () => {
            const result = updateIsUserFavouriteInMap(
                mapDataMock,
                'non-existing-map-id',
                true,
            );

            expect(result).toEqual(mapDataMock);
        });
    });
});
