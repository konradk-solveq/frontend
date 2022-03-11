import {initAppSize} from '@helpers/layoutFoo';
import {render, fireEvent} from '@testing-library/react-native';
import {FiltersContainer} from '@containers/World';
import {filters} from '@containers/World/__mocks__/filtersContainerMocks';
import React from 'react';

const TEST_LENGTH_OPTIONS = ['1', '2', '3', '4', '5'];
const MODAL_TEST_ID = 'filters-container-modal';
const CLOSE_BUTTON_TEST_ID = 'filters-container-close-button';
const CLEAR_BUTTON_TEST_ID = 'filters-container-clear-button';
const LOOP_SWITCH_TEST_ID = 'filters-container-loop-switch';
const MY_PUBLIC_SWITCH_TEST_ID = 'filters-container-my-public-switch';
const SAVE_BUTTON_TEST_ID = 'filters-container-save-button';
const SHOW_ALL_BUTTON_TEST_ID = 'filters-container-show-all-button';

describe('<FiltersContainer /> - containers', () => {
    const onClose = jest.fn();
    const onReset = jest.fn();
    const handleRangeChange = jest.fn();
    const setIsLoop = jest.fn();
    const setIsMyPublic = jest.fn();
    const onSave = jest.fn();
    const onSaveFilters = jest.fn();
    beforeAll(() => {
        initAppSize();
    });

    it('should show modal whe showModal prop is true', async () => {
        const {getByTestId} = render(
            <FiltersContainer
                showModal={true}
                onClose={onClose}
                onResetHandler={onReset}
                lengthOptions={TEST_LENGTH_OPTIONS}
                minLength={TEST_LENGTH_OPTIONS[0]}
                maxLength={TEST_LENGTH_OPTIONS[TEST_LENGTH_OPTIONS.length - 1]}
                handleRangeChange={handleRangeChange}
                isLoop={false}
                setIsLoop={setIsLoop}
                isMyPublic={false}
                setIsMyPublic={setIsMyPublic}
                allowMyPublic={false}
                onSaveHandler={onSave}
                isDirty={false}
                filters={filters}
                pickedFilters={{}}
                onSaveFiltersHandler={onSaveFilters}
            />,
        );
        const modal = getByTestId(MODAL_TEST_ID);
        expect(modal.props.visible).toBe(true);
    });

    it('should trigger the close function on close button press', async () => {
        const {getByTestId} = render(
            <FiltersContainer
                showModal={true}
                onClose={onClose}
                onResetHandler={onReset}
                lengthOptions={TEST_LENGTH_OPTIONS}
                minLength={TEST_LENGTH_OPTIONS[0]}
                maxLength={TEST_LENGTH_OPTIONS[TEST_LENGTH_OPTIONS.length - 1]}
                handleRangeChange={handleRangeChange}
                isLoop={false}
                setIsLoop={setIsLoop}
                isMyPublic={false}
                setIsMyPublic={setIsMyPublic}
                allowMyPublic={false}
                onSaveHandler={onSave}
                isDirty={false}
                filters={filters}
                pickedFilters={{}}
                onSaveFiltersHandler={onSaveFilters}
            />,
        );
        const closeModal = getByTestId(CLOSE_BUTTON_TEST_ID);
        fireEvent.press(closeModal);
        expect(onClose).toBeCalledTimes(1);
    });

    it('should trigger the clear function on clear button press', async () => {
        const {getByTestId} = render(
            <FiltersContainer
                showModal={true}
                onClose={onClose}
                onResetHandler={onReset}
                lengthOptions={TEST_LENGTH_OPTIONS}
                minLength={TEST_LENGTH_OPTIONS[0]}
                maxLength={TEST_LENGTH_OPTIONS[TEST_LENGTH_OPTIONS.length - 1]}
                handleRangeChange={handleRangeChange}
                isLoop={false}
                setIsLoop={setIsLoop}
                isMyPublic={false}
                setIsMyPublic={setIsMyPublic}
                allowMyPublic={false}
                onSaveHandler={onSave}
                isDirty={false}
                filters={filters}
                pickedFilters={{}}
                onSaveFiltersHandler={onSaveFilters}
            />,
        );
        const closeModal = getByTestId(CLEAR_BUTTON_TEST_ID);
        fireEvent.press(closeModal);
        expect(onReset).toBeCalledTimes(1);
    });

    it('should toggle the loop value on switch press', async () => {
        const {getByTestId} = render(
            <FiltersContainer
                showModal={true}
                onClose={onClose}
                onResetHandler={onReset}
                lengthOptions={TEST_LENGTH_OPTIONS}
                minLength={TEST_LENGTH_OPTIONS[0]}
                maxLength={TEST_LENGTH_OPTIONS[TEST_LENGTH_OPTIONS.length - 1]}
                handleRangeChange={handleRangeChange}
                isLoop={false}
                setIsLoop={setIsLoop}
                isMyPublic={false}
                setIsMyPublic={setIsMyPublic}
                allowMyPublic={false}
                onSaveHandler={onSave}
                isDirty={false}
                filters={filters}
                pickedFilters={{}}
                onSaveFiltersHandler={onSaveFilters}
            />,
        );
        const loopSwitch = getByTestId(LOOP_SWITCH_TEST_ID);
        fireEvent.press(loopSwitch);
        expect(setIsLoop).toBeCalledWith(true);
        expect(setIsLoop).toBeCalledTimes(1);
    });

    it("shouldn't render myPublic switch without allowMyPublic flag set", async () => {
        const {queryByTestId} = render(
            <FiltersContainer
                showModal={true}
                onClose={onClose}
                onResetHandler={onReset}
                lengthOptions={TEST_LENGTH_OPTIONS}
                minLength={TEST_LENGTH_OPTIONS[0]}
                maxLength={TEST_LENGTH_OPTIONS[TEST_LENGTH_OPTIONS.length - 1]}
                handleRangeChange={handleRangeChange}
                isLoop={false}
                setIsLoop={setIsLoop}
                isMyPublic={false}
                setIsMyPublic={setIsMyPublic}
                allowMyPublic={false}
                onSaveHandler={onSave}
                isDirty={false}
                filters={filters}
                pickedFilters={{}}
                onSaveFiltersHandler={onSaveFilters}
            />,
        );
        const myPublicSwitch = queryByTestId(MY_PUBLIC_SWITCH_TEST_ID);
        expect(myPublicSwitch).toBeNull();
    });

    it('should toggle the myPublic value on switch press', async () => {
        const {getByTestId} = render(
            <FiltersContainer
                showModal={true}
                onClose={onClose}
                onResetHandler={onReset}
                lengthOptions={TEST_LENGTH_OPTIONS}
                minLength={TEST_LENGTH_OPTIONS[0]}
                maxLength={TEST_LENGTH_OPTIONS[TEST_LENGTH_OPTIONS.length - 1]}
                handleRangeChange={handleRangeChange}
                isLoop={false}
                setIsLoop={setIsLoop}
                isMyPublic={false}
                setIsMyPublic={setIsMyPublic}
                allowMyPublic={true}
                onSaveHandler={onSave}
                isDirty={false}
                filters={filters}
                pickedFilters={{}}
                onSaveFiltersHandler={onSaveFilters}
            />,
        );
        const myPublicSwitch = getByTestId(MY_PUBLIC_SWITCH_TEST_ID);
        fireEvent.press(myPublicSwitch);
        expect(setIsMyPublic).toBeCalledWith(true);
        expect(setIsMyPublic).toBeCalledTimes(1);
    });

    it('should render the show all button while isDirty is set to false', async () => {
        const {getByTestId} = render(
            <FiltersContainer
                showModal={true}
                onClose={onClose}
                onResetHandler={onReset}
                lengthOptions={TEST_LENGTH_OPTIONS}
                minLength={TEST_LENGTH_OPTIONS[0]}
                maxLength={TEST_LENGTH_OPTIONS[TEST_LENGTH_OPTIONS.length - 1]}
                handleRangeChange={handleRangeChange}
                isLoop={false}
                setIsLoop={setIsLoop}
                isMyPublic={false}
                setIsMyPublic={setIsMyPublic}
                allowMyPublic={true}
                onSaveHandler={onSave}
                isDirty={false}
                filters={filters}
                pickedFilters={{}}
                onSaveFiltersHandler={onSaveFilters}
            />,
        );
        const showAllButton = getByTestId(SHOW_ALL_BUTTON_TEST_ID);
        fireEvent.press(showAllButton);
        expect(onSave).toBeCalledTimes(1);
    });

    it('should render the filter button while isDirty is set to true', async () => {
        const {getByTestId} = render(
            <FiltersContainer
                showModal={true}
                onClose={onClose}
                onResetHandler={onReset}
                lengthOptions={TEST_LENGTH_OPTIONS}
                minLength={TEST_LENGTH_OPTIONS[0]}
                maxLength={TEST_LENGTH_OPTIONS[TEST_LENGTH_OPTIONS.length - 1]}
                handleRangeChange={handleRangeChange}
                isLoop={false}
                setIsLoop={setIsLoop}
                isMyPublic={false}
                setIsMyPublic={setIsMyPublic}
                allowMyPublic={true}
                onSaveHandler={onSave}
                isDirty={true}
                filters={filters}
                pickedFilters={{}}
                onSaveFiltersHandler={onSaveFilters}
            />,
        );
        const filterButton = getByTestId(SAVE_BUTTON_TEST_ID);
        fireEvent.press(filterButton);
        expect(onSave).toBeCalledTimes(1);
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
