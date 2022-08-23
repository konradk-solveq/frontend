import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {PickedFilters} from '@interfaces/form';
import {mapOptionsAndTagsSelector} from '@storage/selectors/app';

import {getFilters, updateFilters} from './filtersData';
import {RangePickerRef} from '@components/slider/RangePicker';
import {useMergedState} from '@hooks/useMergedState';
import {FiltersContainer} from '@containers/World';
import {getFilterDistance} from '@utils/transformData';
import {debounce} from '@utils/input/debounce';
import {setMapsAppliedFilters} from '@storage/actions/maps';

const lengthOptions = ['0', '5', '10', '20', '40', '80', '120', '160', '200'];

const getFiltersToSave = (
    pickedFilters: PickedFilters,
    isLoop: boolean,
    isMyPublic: boolean,
    minLength: string,
    maxLength: string,
) => {
    const filtersToSave = {...pickedFilters};
    const distanceFrom = getFilterDistance(minLength);
    const distanceTo = getFilterDistance(maxLength);
    filtersToSave.loop = [`${isLoop}`];
    filtersToSave.onlyPublic = [`${isMyPublic}`];
    /**
     * Options are given in kms - filters accept the values in meters
     */
    filtersToSave.distanceFrom = distanceFrom ? [`${distanceFrom}`] : [];
    filtersToSave.distanceTo = distanceTo ? [`${distanceTo}`] : [];
    return filtersToSave;
};

interface IProps {
    onSave: (picked: PickedFilters) => void;
    onClose: () => void;
    onGetFiltersCount: (filters: PickedFilters) => void;
    onResetFiltersCount: () => void;
    definedFilters: PickedFilters;
    itemsCount?: number;
    showModal?: boolean;
    allowedFilters?: string[];
    allowMyPublic?: boolean;
    mapMode: string;
}

const FiltersModal: React.FC<IProps> = ({
    onSave,
    onClose,
    definedFilters,
    itemsCount,
    showModal = false,
    allowMyPublic = false,
    onGetFiltersCount,
    onResetFiltersCount,
    mapMode,
}: IProps) => {
    const mapOptions = useAppSelector(mapOptionsAndTagsSelector);
    const dispatch = useAppDispatch();
    const filters = getFilters(mapOptions);

    const rangePickerRef = useRef<RangePickerRef>();

    const [{minLength, maxLength}, setLengthFilter] = useMergedState({
        minLength: lengthOptions[0],
        maxLength: lengthOptions[lengthOptions.length - 1],
    });

    const [isLoop, setIsLoop] = useState<boolean>(false);
    const [isMyPublic, setIsMyPublic] = useState<boolean>(false);
    const [isDirty, setIsDirty] = useState<boolean>(false);

    const debouncedReset = useMemo(() => debounce(onResetFiltersCount), [
        onResetFiltersCount,
    ]);

    const debouncedGetFilters = useMemo(
        () => debounce(onGetFiltersCount, 500),
        [onGetFiltersCount],
    );

    const handleRangeChange = useCallback(
        (low: string, high: string) => {
            setLengthFilter({minLength: low, maxLength: high});
        },
        [setLengthFilter],
    );

    const [pickedFilters, setPickedFilters] = useState<PickedFilters>(
        definedFilters,
    );

    const onSaveFiltersHanlder = (filterName: string, filtersArr: string[]) => {
        setPickedFilters(prev => updateFilters(prev, filterName, filtersArr));
    };

    const onSaveHandler = (isApplied: boolean) => {
        const filtersToSave = getFiltersToSave(
            pickedFilters,
            isLoop,
            isMyPublic,
            minLength,
            maxLength,
        );
        dispatch(setMapsAppliedFilters(mapMode, isApplied));
        onSave(filtersToSave);
    };

    const onResetHandler = () => {
        setPickedFilters({});
        setIsMyPublic(false);
        setIsLoop(false);
        setIsDirty(false);
        rangePickerRef.current && rangePickerRef.current.reset();
    };

    useEffect(() => {
        const isDefaultLength =
            minLength === lengthOptions[0] &&
            maxLength === lengthOptions[lengthOptions.length - 1];
        const isDefaultFilters = !Object.keys(pickedFilters).length;

        // eslint-disable-next-line no-undef
        const controller = new AbortController();
        if (isLoop || isMyPublic || !isDefaultFilters || !isDefaultLength) {
            setIsDirty(true);
            debouncedGetFilters(
                getFiltersToSave(
                    pickedFilters,
                    isLoop,
                    isMyPublic,
                    minLength,
                    maxLength,
                ),
                controller,
            );
        } else {
            debouncedReset();
            setIsDirty(false);
        }

        return () => {
            controller.abort();
        };
    }, [
        isLoop,
        isMyPublic,
        minLength,
        maxLength,
        pickedFilters,
        onGetFiltersCount,
        onResetFiltersCount,
        debouncedGetFilters,
        debouncedReset,
    ]);
    return (
        <FiltersContainer
            showModal={showModal}
            onClose={onClose}
            onResetHandler={onResetHandler}
            lengthOptions={lengthOptions}
            minLength={minLength}
            maxLength={maxLength}
            handleRangeChange={handleRangeChange}
            isLoop={isLoop}
            setIsLoop={setIsLoop}
            isMyPublic={isMyPublic}
            setIsMyPublic={setIsMyPublic}
            rangePickerRef={rangePickerRef}
            allowMyPublic={allowMyPublic}
            onSaveHandler={onSaveHandler}
            isDirty={isDirty}
            itemsCount={itemsCount}
            filters={filters}
            pickedFilters={pickedFilters}
            onSaveFiltersHandler={onSaveFiltersHanlder}
        />
    );
};

export default FiltersModal;
