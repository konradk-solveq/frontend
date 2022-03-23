import {PickedFilters} from '../../interfaces/form';
import {DropdownItemT} from '@components/types/dropdown';

/**
 * Filters that contain a single value that cannot be sent as an array
 */
const filtersToExtract = ['loop', 'onlyPublic', 'distanceTo', 'distanceFrom'];

export const checkIfContainsFitlers = (filters?: PickedFilters): boolean => {
    if (!filters) {
        return false;
    }

    if (!Object.keys(filters)?.length || Object.keys(filters)?.length === 0) {
        return false;
    }

    let isValid = false;
    Object.keys(filters).forEach(f => {
        if (filters?.[f]?.length) {
            isValid = true;
        }
    });

    return isValid;
};

export const getFiltersParam = (filters?: PickedFilters) => {
    if (!filters || !Object.keys(filters)?.length) {
        return {};
    }

    let newFilters = {};
    Object.keys(filters).forEach(f => {
        if (filters?.[f]?.length) {
            /* TODO: remove replacement after fix on API */
            const cKeyD = f === 'difficulties' ? 'difficulty' : '';
            const cKeyS = f === 'surfaces' ? 'surface' : '';
            const cKeyT = f === 'tags' ? 'tag' : '';
            const key = cKeyD || cKeyS || cKeyT || f;
            /* array values */
            if (filtersToExtract.includes(f)) {
                newFilters = {
                    ...newFilters,
                    [key]: filters[f][0],
                };
            } else if (f !== 'created' && f !== 'distance') {
                newFilters = {
                    ...newFilters,
                    [key]: filters[f],
                };
            } else {
                /* string values */
                newFilters = {
                    ...newFilters,
                    sortBy: f,
                    order: filters[f]?.[0],
                };
            }
        }
    });

    return newFilters;
};

export const getSorByFilters = (
    filters?: PickedFilters,
    newFilter?: DropdownItemT,
) => {
    if (!newFilter) {
        if (filters && Object.keys(filters)?.length) {
            return filters;
        }

        return {};
    }

    if (!filters || !Object.keys(filters)?.length) {
        return {
            [newFilter.sortBy]: [newFilter.order],
        };
    }

    let filtersToUpdate = {};
    Object.keys({...filters}).forEach(f => {
        if (f !== ('created' || 'distance')) {
            filtersToUpdate = {
                ...filtersToUpdate,
                ...{[f]: filters[f]},
            };
        }
    });

    const updatedFilters = {
        ...filtersToUpdate,
        [newFilter.sortBy]: [newFilter.order],
    };
    return updatedFilters;
};
