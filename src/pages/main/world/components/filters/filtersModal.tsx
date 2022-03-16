import React, {useState, useEffect, useCallback, useRef} from 'react';
import {useAppSelector} from '@hooks/redux';
import {PickedFilters} from '@interfaces/form';
import {mapOptionsAndTagsSelector} from '@storage/selectors/app';

import {getFilters, updateFilters} from './filtersData';
import {RangePickerRef} from '@components/slider/RangePicker';
import {useMergedState} from '@hooks/useMergedState';
import {FiltersContainer} from '@containers/World';
import {getFilterDistance} from '@utils/transformData';

const lengthOptions = ['0', '5', '10', '20', '40', '80', '120', '160', '200'];

interface IProps {
    onSave: (picked: PickedFilters) => void;
    onClose: () => void;
    definedFilters: PickedFilters;
    showModal?: boolean;
    allowedFilters?: string[];
    allowMyPublic?: boolean;
}

const FiltersModal: React.FC<IProps> = ({
    onSave,
    onClose,
    definedFilters,
    showModal = false,
    allowMyPublic = false,
}: IProps) => {
    const mapOptions = useAppSelector(mapOptionsAndTagsSelector);
    const filters = getFilters(mapOptions);

    const rangePickerRef = useRef<RangePickerRef>();

    const [{minLength, maxLength}, setLengthFilter] = useMergedState({
        minLength: lengthOptions[0],
        maxLength: lengthOptions[lengthOptions.length - 1],
    });

    const [isLoop, setIsLoop] = useState<boolean>(false);
    const [isMyPublic, setIsMyPublic] = useState<boolean>(false);
    const [isDirty, setIsDirty] = useState<boolean>(false);

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

    const onSaveHandler = () => {
        const distanceFrom = getFilterDistance(minLength);
        const distanceTo = getFilterDistance(maxLength);
        const filtersToSave = pickedFilters;
        filtersToSave.loop = [`${isLoop}`];
        filtersToSave.onlyPublic = [`${isMyPublic}`];
        /**
         * Options are given in kms - filters accept the values in meters
         */
        filtersToSave.distanceFrom = distanceFrom ? [`${distanceFrom}`] : [];
        filtersToSave.distanceTo = distanceTo ? [`${distanceTo}`] : [];
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
        if (isLoop || isMyPublic || !isDefaultFilters || !isDefaultLength) {
            setIsDirty(true);
        } else {
            setIsDirty(false);
        }
    }, [isLoop, isMyPublic, minLength, maxLength, pickedFilters]);
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
            filters={filters}
            pickedFilters={pickedFilters}
            onSaveFiltersHandler={onSaveFiltersHanlder}
        />
    );
};

export default FiltersModal;
