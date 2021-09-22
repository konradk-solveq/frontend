import deepCopy from '@helpers/deepCopy';
import {UserBike} from '@models/userBike.model';

import bikesListMock from '../mocks/bikes/bikesListData';
import bikeToAddMock from '../mocks/bikes/bikeToAddData';
import bikesListToUpdateMock, {
    bikesNumbersToUpdate,
} from '../mocks/bikes/bikesListToUpdateData';
import existingBikeToAddMock from '../mocks/bikes/existingBikeToAddData';
import updatedListAfterAddingNewBikeMock from '../mocks/bikes/updatedListAfterAddingNewBikeData';
import updatedListAfterAddingExistingBikeMock from '../mocks/bikes/updatedListAfterAddingExitingBikeData';
import {addNewBikeDataOrReplaceIfExists, updateBikesList} from '../bikes';

const oldBikesList: UserBike[] = deepCopy(bikesListMock);
const bikeToAdd: UserBike = deepCopy(bikeToAddMock);
const bikesListToUpdate: UserBike[] = deepCopy(bikesListToUpdateMock);
const existedBikeToAdd: UserBike = deepCopy(existingBikeToAddMock);
const updatedListAfterAddingNewBike: UserBike[] = deepCopy(
    updatedListAfterAddingNewBikeMock,
);
const updatedListAfterAddingExistingBike: UserBike[] = deepCopy(
    updatedListAfterAddingExistingBikeMock,
);

describe('Return merged state of bikes reducer -- utils', () => {
    describe('[addNewBikeDataOrReplaceIfExists]', () => {
        it('should add new bike to exitings bikes list', () => {
            const lengthBeforeUpdate = oldBikesList.length;

            const updatedState = addNewBikeDataOrReplaceIfExists(
                oldBikesList,
                bikeToAdd,
            );
            const lengthAfterUpdate = updatedState.length;

            expect(updatedState).toEqual(updatedListAfterAddingNewBike);
            expect(lengthAfterUpdate).toEqual(lengthBeforeUpdate + 1);

            expect(updatedState).toMatchSnapshot();
        });

        it('should add new bike to empty bikes list', () => {
            const lengthBeforeUpdate = 0;

            const updatedState = addNewBikeDataOrReplaceIfExists([], bikeToAdd);
            const lengthAfterUpdate = updatedState.length;

            expect(updatedState).toEqual([bikeToAdd]);
            expect(lengthAfterUpdate).toEqual(lengthBeforeUpdate + 1);

            expect(updatedState).toMatchSnapshot();
        });

        it('should replace bike in existing bikes list when new bike has already existed', () => {
            const lengthBeforeUpdate = oldBikesList.length;
            const updatedState = addNewBikeDataOrReplaceIfExists(
                oldBikesList,
                existedBikeToAdd,
            );
            const lengthAfterUpdate = updatedState.length;

            expect(updatedState).toEqual(updatedListAfterAddingExistingBike);
            expect(lengthAfterUpdate).toEqual(lengthBeforeUpdate);

            expect(updatedState).toMatchSnapshot();
        });
    });

    describe('[updateBikesList]', () => {
        it('should update bikes with existing bikes list', () => {
            const lengthBeforeUpdate = oldBikesList.length;
            const updatedState = updateBikesList(
                oldBikesList,
                bikesListToUpdate,
                bikesNumbersToUpdate,
            );
            const lengthAfterUpdate = updatedState.length;

            expect(updatedState).toEqual(oldBikesList);
            expect(lengthAfterUpdate).toEqual(lengthBeforeUpdate);

            expect(updatedState).toMatchSnapshot();
        });

        it('should add new bike instead of update existing list when wrong bikes numbers list passed', () => {
            const lengthBeforeUpdate = oldBikesList.length;
            const updatedState = updateBikesList(
                oldBikesList,
                bikesListToUpdate,
                [bikesNumbersToUpdate[0]], //contains 3 elements
            );
            const lengthAfterUpdate = updatedState.length;

            expect(updatedState).not.toEqual(oldBikesList);
            expect(lengthAfterUpdate).toEqual(lengthBeforeUpdate + 1);

            expect(updatedState).toMatchSnapshot();
        });

        it('should add new bike data when update empty list', () => {
            const updatedState = updateBikesList(
                [],
                bikesListToUpdate,
                bikesNumbersToUpdate,
            );
            const lengthAfterUpdate = updatedState.length;

            expect(updatedState).not.toEqual(oldBikesList);
            expect(updatedState).toEqual(bikesListToUpdate);

            expect(lengthAfterUpdate).toEqual(bikesListToUpdate.length);

            expect(updatedState).toMatchSnapshot();
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
